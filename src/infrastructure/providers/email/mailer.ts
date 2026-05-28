import nodemailer from "nodemailer"
import { EmailPayload } from "../../../shared/types/notification";
import { env } from "../../../config/envVars";

const transporter = nodemailer.createTransport({
  service: env.EMAIL,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
  host: env.EMAIL_HOST,
});

type SendMailType = (payload: EmailPayload) => Promise<{ success: boolean; error?: any }>;

export const sendMail: SendMailType = async function (options: EmailPayload) {
  try {
    const response = await transporter.sendMail(options);
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}