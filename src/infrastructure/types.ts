import { availableQueues } from "./config";

export type QueueTypes = (typeof availableQueues)[number];

export type Options<T extends QueueTypes> = {
  feature: string;
  queue: T;
};

export type PushNotification = Options<"push"> & {
  fcmToken: string;
  subject: string;
  message: string;
  images?: string[];
};

export type SMSNotification = Options<"sms"> & {
  phone: string;
  message: string;
};

export type EmailNotification = Options<"email"> & {
  sender: string;
  receiver: string;
  subject?: string;
  message?: string;
};

export type NotificationType =
  | PushNotification
  | SMSNotification
  | EmailNotification;
