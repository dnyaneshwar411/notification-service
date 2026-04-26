import { Queue } from "bullmq";
import { connection } from "./config";

export const pushQueue = new Queue("push", { connection });
export const smsQueue = new Queue("sms", { connection });
export const emailQueue = new Queue("email", { connection });
