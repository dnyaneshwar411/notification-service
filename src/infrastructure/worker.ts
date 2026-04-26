import { Worker } from "bullmq";
import { connection } from "./config";
import { sendFirebaseNotification } from "../providers/firebase/firebase-push";
import { sendMail } from "../providers/email/mailer";
import { sendDLTMessage } from "../providers/dlt/dlt";

export const pushWorker = new Worker("push", async function (job) {
  await sendFirebaseNotification(job.data)
}, {
  connection: connection,
});

export const smsWorker = new Worker("sms", async function (job) {
  await sendMail(job.data)
}, {
  connection: connection,
});

export const emailWorker = new Worker("email", async function (job) {
  await sendDLTMessage(job.data)
}, {
  connection: connection,
});
