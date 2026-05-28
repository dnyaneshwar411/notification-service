import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { getNotificationById, paginateNotifications, updateNotificationByFilter } from "../../core/entities/notification.entity";
import { Schema } from "mongoose";
import { IUser } from "../../infrastructure/database/models/user.model";
import { publishEvent } from "../../core/events/eventBus";

export const retrieveNotifications = catchAsync(async function (
  req: Request,
  res: Response,
) {
  const data = await paginateNotifications(req.query as any);
  return res.status(200).json({
    status_code: 200,
    message: "Successful",
    ...data
  });
})

export const createNotificationController = catchAsync(async function (
  req: Request,
  res: Response,
) {
  publishEvent(req.body)
  return res.status(200).json({ success: true, message: "Successfull" });
});

export const updateNotificationController = catchAsync(async function (
  req: Request & { user: Partial<IUser> },
  res: Response,
) {
  const { notificationId } = req.params;
  await updateNotificationByFilter(
    notificationId as string,
    req.user?._id as Schema.Types.ObjectId,
    req.body
  )
  return res.status(200).json({ success: true, message: "Successfull" });
});

export const deleteNotificationController = catchAsync(async function (
  req: Request,
  res: Response,
) {
  // use event bus to pull the notification from the redis queue. *tbd*
  return res.status(200).json({ success: true, message: "Successfull" });
});

export const retrieveNotificationById = catchAsync(async function (
  req: Request,
  res: Response,
) {
  const notification = await getNotificationById(req.params.notificationId as string)
  return res.status(200).json({ success: true, notification });
});
