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
  } catch (error) {};
  return
};

init()

type SendFirebaseNotificationType = (payload: PushNotification) => Promise<{ success: boolean; error?: any }>;

export const sendFirebaseNotification: SendFirebaseNotificationType = async function (options: PushNotification) {
  try {
    const { fcmToken: token, images, ...data } = options
    await getMessaging().send({
      data,
      token
    })
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}