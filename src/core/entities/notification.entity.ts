import mongoose, { QueryFilter, Schema } from "mongoose";
import Notification, { INotification } from "../../infrastructure/database/models/notification.model";
import { getUserById } from "./user.entity";

export const getNotificationById = async function (
  notificationId: Schema.Types.ObjectId | string,
  fields: string = ""
) {
  return await Notification
    .findById(notificationId)
    .select(fields)
    .lean();
}

export const paginateNotifications = async function (
  query: {
    page: number;
    limit: number;
    sortBy?: string;
    category?: "system" | "promotional";
    status?: "created" | "received" | "read" | "deleted";
  }
): Promise<{ data: INotification[]; total: number; page: number; limit: number }> {
  const { page, limit, sortBy, category, status } = query;

  const filter: QueryFilter<INotification> = {};

  if (category) {
    filter.category = category;
  }

  if (status) {
    filter.status = status;
  }

  let sortOption: Record<string, 1 | -1> = { createdAt: -1 }; 

  if (sortBy) {
    const parts = sortBy.split(":");
    const field = parts[0] as string;
    const order = parts[1] === "asc" ? 1 : -1;
    sortOption = { [field]: order };
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Notification.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate("actor", "name email")
      .lean(),
    Notification.countDocuments(filter),
  ]);

  return {
    data: data as unknown as INotification[],
    total,
    page,
    limit,
  };
};

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