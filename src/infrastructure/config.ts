import IORedis from "ioredis";

export const availableQueues = ["push", "sms", "email"];

export const connection = new IORedis("redis://127.0.0.1:6379" as string, {
  maxRetriesPerRequest: null,
  connectTimeout: 10000,
  retryStrategy: () => null,
});
