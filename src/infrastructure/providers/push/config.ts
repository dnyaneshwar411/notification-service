import { ServiceAccount } from "firebase-admin";
import { env } from "../../../config/envVars";

export const credentials: ServiceAccount = {
  projectId: env.FIREBASE_PROJECT_ID,
  privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
};