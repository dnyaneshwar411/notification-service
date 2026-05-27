import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

import { credential } from 'firebase-admin';
import { credentials } from './config';
import { env } from '../../../config/envVars';
import { PushNotification } from '../../../shared/types/notification';

const init = async function () {
  try {
    initializeApp({
      credential: credential.cert(credentials),
      projectId: env.FIREBASE_PROJECT_ID
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