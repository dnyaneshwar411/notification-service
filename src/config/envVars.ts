import * as zod from "zod";
import dotenv from "dotenv";

const envSchema = zod.object({
  NODE_ENV: zod.string(),
  EXPRESS_PORT: zod.coerce.number().default(1993),

  REDIS_URL: zod.string(),

  FIREBASE_PROJECT_ID: zod.string(),
  FIREBASE_PRIVATE_KEY_ID: zod.string(),
  FIREBASE_PRIVATE_KEY: zod.string(),
  FIREBASE_CLIENT_EMAIL: zod.string(),
  FIREBASE_CLIENT_ID: zod.string(),
  FIREBASE_CLIENT_X509_CERT_URL: zod.string(),

  EMAIL: zod.string(),
  EMAIL_HOST: zod.string(),
  EMAIL_PORT: zod.string(),
  EMAIL_USER: zod.string(),
  EMAIL_PASSWORD: zod.string(),
  EMAIL_FROM: zod.string(),

  DLT_AUTHORIZATION_KEY: zod.string(),
  DLT_SENDER_ID: zod.string(),
  DLT_MESSAGE_ID: zod.string(),
  DLT_BASE_URL: zod.string(),

  QUEUE_RETRY_COUNT: zod.coerce.number(),

  MONGOOSE_DB_URL: zod.string(),

  JWT_SECRET_TOKEN: zod.string(),
});

const validateEnv = function() {
  try {
    dotenv.config();
    return envSchema.parse(process.env);
  } catch (error) {
    process.exit(1);
  }
};

export const env = validateEnv();
