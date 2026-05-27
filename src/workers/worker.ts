import { Worker } from "bullmq";
import { redisConnection } from "../infrastructure/queue/queue";
import { NotificationEventPayload } from "../shared/types/notification";
import { sendFirebaseNotification } from "../infrastructure/providers/push/fcm";
import { sendMail } from "../infrastructure/providers/email/mailer";
import { sendDLTMessage } from "../infrastructure/providers/sms/dlt";

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
    await sendFirebaseNotification(job.data);
  },
  {
    connection: redisConnection,
    limiter: rateLimitOptionsPush,
  },
);

export const smsWorker = new Worker(
  "sms",
  async function (job: Omit<NotificationEventPayload, "type">) {
    await sendMail(job.data);
  },
  {
    connection: redisConnection,
    limiter: rateLimitOptionsSMS,
  },
);

export const emailWorker = new Worker(
  "email",
  async function (job: Omit<NotificationEventPayload, "type">) {
    await sendDLTMessage(job.data);
  },
  {
    connection: redisConnection,
    limiter: rateLimitOptionsEmail,
  },
);