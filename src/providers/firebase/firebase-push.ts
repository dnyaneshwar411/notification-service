import { initializeApp } from 'firebase-admin/app';
import { envVars } from '../../config/constants';
import { getMessaging } from 'firebase-admin/messaging';
import { PushNotification } from '../../infrastructure/types';
import { credential } from 'firebase-admin';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

const init = async function () {
  try {
    const serviceAccount = await readFile(path.resolve(__dirname, "./service-account.json"), "utf-8")
    initializeApp({
      credential: credential.cert(JSON.parse(serviceAccount)),
      projectId: envVars.FIREBASE_PROJECT_ID
    })
  } catch (error) {
    console.error(error)
  };
  return
};

init()

export const sendFirebaseNotification = async function (options: PushNotification) {
  // return
  console.log("condition hit", options)
  try {
    const { fcmToken: token, images, ...data } = options
    const response = await getMessaging().send({
      data,
      token
    })
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}