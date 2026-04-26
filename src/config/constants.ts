import dotenv from "dotenv";
dotenv.config({});

export const envVars = {
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID as string,
}