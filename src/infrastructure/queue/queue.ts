import IORedis from "ioredis";
import { env } from "../../config/envVars";
import { JobsOptions, Queue } from "bullmq";

export const redisConnection = new IORedis(env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
  connectTimeout: 10000,
  retryStrategy: () => null,
});

export const retryAndBackOff: JobsOptions = {
  attempts: env.QUEUE_RETRY_COUNT,
  backoff: {
    type: "exponential",
    delay: 1000,
  },
};

export const pushQueue = new Queue("push", { connection: redisConnection });
export const smsQueue = new Queue("sms", { connection: redisConnection });
export const emailQueue = new Queue("email", { connection: redisConnection });