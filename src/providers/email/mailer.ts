import { EmailPayload } from "./types";
import nodemailer from "nodemailer"
import { envVars } from "../../config/constants";

const transporter = nodemailer.createTransport({
  service: envVars.EMAIL,
  secure: true,
  auth: {
    user: envVars.EMAIL_USER,
    pass: envVars.EMAIL_PASSWORD,
  },
  host: envVars.EMAIL_HOST,
});

export const sendMail = async function (options: EmailPayload) {
  transporter.sendMail(options)
}