import mongoose, { Schema } from "mongoose";
import Notification, { INotification } from "../../infrastructure/database/models/notification.model";

export const getNotificationById = async function (
  notificationId: Schema.Types.ObjectId | string,
  fields: string = ""
) {
  return await Notification
    .findById(notificationId)
    .select(fields)
    .lean();
}

export const paginateNotifications: () => Promise<INotification[]> = async function () {
  return []
}

export const createNotification = async function (
  body: Partial<Omit<INotification, "status" | "statusTimeline" | "">>
) {
  return await Notification.create(body);
}

export const updateNotificationByFilter = async function (
  notificationId: Schema.Types.ObjectId | string,
  actorId: Schema.Types.ObjectId | string,
  body: Partial<INotification>
) {
  const query = {
    _id: notificationId,
    actor: actorId as Schema.Types.ObjectId
  } as mongoose.QueryFilter<INotification>;

  return await Notification.findOneAndUpdate(query, {
    $set: body
  });
}

export const deleteNotificationByFilter = async function (
  notificationId: Schema.Types.ObjectId | string,
  actorId: Schema.Types.ObjectId | string,
) {
  const query = {
    _id: notificationId,
    actor: actorId as Schema.Types.ObjectId
  } as mongoose.QueryFilter<INotification>;

  return await Notification.findOneAndDelete(query);
}