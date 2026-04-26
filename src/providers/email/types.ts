export type EmailPayload = {
  to: string;
  subject: string;
  message: string;
  html?: string;
}