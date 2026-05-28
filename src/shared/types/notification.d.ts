export type EventTypes = "notification";

type NotificationTypes = "push" | "email" | "sms";

export type NotificationEventPayload = {
  type: NotificationTypes,
  [key: string]: any
}

export type PushNotification = {
  fcmToken: string;
  subject: string;
  message: string;
  images?: string[];
};

export type SMSNotification = {
  phone: string;
  message: string;
};

export type EmailNotification = {
  sender: string;
  receiver: string;
  subject?: string;
  message?: string;
};

export type EmailPayload = {
  to: string;
  subject: string;
  message: string;
  html?: string;
}

export type DLTMessagePayload = {
  vars: string;
  numbers: number
}