import dotenv from "dotenv";
dotenv.config({});

export const envVars = {
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID as string,
  FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID as string,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY as string,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL as string,
  FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID as string,
  FIREBASE_CLIENT_X509_CERT_URL: process.env.FIREBASE_CLIENT_X509_CERT_URL as string,

  EMAIL: process.env.EMAIL as string,
  EMAIL_PORT: process.env.EMAIL_PORT as string,
  EMAIL_USER: process.env.EMAIL_USER as string,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD as string,
  EMAIL_HOST: process.env.EMAIL_HOST as string,

  DLT_AUTHORIZATION_KEY: process.env.DLT_AUTHORIZATION_KEY as string,
  DLT_SENDER_ID: process.env.DLT_SENDER_ID as string,
  DLT_MESSAGE_ID: process.env.DLT_MESSAGE_ID as string,
  DLT_BASE_URL: process.env.DLT_BASE_URL as string,
}