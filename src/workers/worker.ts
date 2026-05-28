import { Worker } from "bullmq";
import { redisConnection } from "../infrastructure/queue/queue";
import { NotificationEventPayload } from "../shared/types/notification";
import { sendFirebaseNotification } from "../infrastructure/providers/push/fcm";
import { sendMail } from "../infrastructure/providers/email/mailer";
import { sendDLTMessage } from "../infrastructure/providers/sms/dlt";
import { getUserById } from "../core/entities/user.entity";

const rateLimitOptionsPush = {
  max: 500,
  duration: 1000,
};

const rateLimitOptionsEmail = {
  max: 2,
  duration: 1000,
};

const rateLimitOptionsSMS = {
  max: 5,
  duration: 1000,
};

export const pushWorker = new Worker(
  "push",
  async function (job: Omit<NotificationEventPayload, "type">) {
    try {
      const user = await getUserById(job.data.recipient, "fcmToken");
      if (!user?.fcmToken) throw new Error("FCM TOkEN NOT AVAILABLE");
      const { success, error } = await sendFirebaseNotification({
        fcmToken: user?.fcmToken as string,
        subject: job.data.subject,
        message: job.data.message,
        images: job.data.images
      });
      if (!success) throw new Error(error);
    } catch (error) {
      throw error;
    }
  },
  {
    connection: redisConnection,
    limiter: rateLimitOptionsPush,
  },
);

export const smsWorker = new Worker(
  "sms",
  async function (job: Omit<NotificationEventPayload, "type">) {
    try {
      const user = await getUserById(job.data.recipient, "name mobileNumber");
      const { success, error } = await sendDLTMessage({
        vars: "",
        numbers: user?.mobileNumber as number
      });
      if (!success) throw new Error(error);
    } catch (error) {
      throw error;
    }
  },
  {
    connection: redisConnection,
    limiter: rateLimitOptionsSMS,
  },
);

export const emailWorker = new Worker(
  "email",
  async function (job: Omit<NotificationEventPayload, "type">) {
    try {
      const user = await getUserById(job.data.recipient, "name email mobileNumber");
      const { success, error } = await sendMail({
        to: user?.email as string,
        subject: job.data.subject,
        message: job.data.message,
        html: "",
      });
      if (!success) throw new Error(error);
    } catch (error) {
      throw error;
    }
  },
  {
    connection: redisConnection,
    limiter: rateLimitOptionsEmail,
  },
);