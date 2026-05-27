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

export const sendMail = async function (options: EmailPayload) {
  transporter.sendMail(options)
}