import {
  EmailNotification,
  NotificationType,
  PushNotification,
  QueueTypes,
  SMSNotification,
} from "./types";
import { emailQueue, pushQueue, smsQueue } from "./queue";

const buildPushNotificationConfig = function(options: PushNotification) {
  return {
    fcmToken: options.fcmToken,
    subject: options.subject,
    message: options.message,
    images: options.images,
  };
};

const buildSMSNotificationConfig = function(options: SMSNotification) {
  return {
    phone: options.phone,
    message: options.message,
  };
};

const buildEmailNotificationConfig = function(options: EmailNotification) {
  return {
    sender: options.sender,
    receiver: options.receiver,
    subject: options.subject,
    message: options.message,
  };
};

const buildJob = function <T extends NotificationType>(
  type: QueueTypes,
  options: T,
) {
  switch (type) {
    case "push":
      return buildPushNotificationConfig(options as PushNotification);
    case "sms":
      return buildSMSNotificationConfig(options as SMSNotification);
    case "email":
      return buildEmailNotificationConfig(options as EmailNotification);
    default:
      throw new Error("not working");
  }
};

const generateJobId = function({
  feature,
  queue,
  eventId,
}: {
  feature: string;
  queue: string;
  eventId?: string;
}) {
  return `${eventId || Date.now()}-${feature}-${queue}`;
};

export const addJob = async function <T extends NotificationType>(
  type: QueueTypes,
  options: T,
) {
  const jobConfig = buildJob(type, options);
  const jobId = generateJobId({
    feature: options.feature,
    queue: options.queue,
  });
  switch (type) {
    case "push":
      return pushQueue.add(jobId, jobConfig);
    case "sms":
      return smsQueue.add(jobId, jobConfig);
    case "email":
      return emailQueue.add(jobId, jobConfig);
    default:
      break;
  }
};
