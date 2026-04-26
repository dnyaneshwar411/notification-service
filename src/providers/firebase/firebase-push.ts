import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import { envVars } from '../../config/constants';
import { getMessaging } from 'firebase-admin/messaging';
import { PushNotification } from '../../infrastructure/types';
import { credential } from 'firebase-admin';

const credentials: ServiceAccount = {
  projectId: envVars.FIREBASE_PROJECT_ID,
  privateKey: envVars.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: envVars.FIREBASE_CLIENT_EMAIL,
};

const init = async function () {
  try {
    initializeApp({
      credential: credential.cert(credentials),
      projectId: envVars.FIREBASE_PROJECT_ID
    })
  } catch (error) {
    console.error(error)
  };
  return
};

init()

export const sendFirebaseNotification = async function (options: PushNotification) {
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