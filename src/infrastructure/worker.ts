import { Worker } from "bullmq";
import { connection } from "./config";
import { sendFirebaseNotification } from "../providers/firebase/firebase-push";

export const pushWorker = new Worker("push", async function(job) {
  await sendFirebaseNotification(job.data)
}, {
  connection: connection,
});

export const smsWorker = new Worker("sms", async function(job) { }, {
  connection: connection,
});

export const emailWorker = new Worker("email", async function(job) { }, {
  connection: connection,
});
