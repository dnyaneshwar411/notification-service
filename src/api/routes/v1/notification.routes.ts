import express, { Router } from "express";
import {
  createNotificationController,
  deleteNotificationController,
  retrieveNotificationById,
  retrieveNotifications,
  updateNotificationController,
} from "../../controllers/notification.controller";
import {
  createNotificationValidation,
  deleteNotificationValidation,
  retrieveNotificationByIdValidation,
  retrieveNotificationsValidation,
  updateNotificationValidation,
} from "../../validators/notification.validator";
import { validate } from "../../middlewares/validate.middleware";
import { authenticate } from "../../middlewares/authenticate.middleware";

const router: Router = express.Router();

router
  .route("/")
  .get(
    validate(retrieveNotificationsValidation),
    retrieveNotifications
  )
  .post(
    validate(createNotificationValidation),
    authenticate,
    createNotificationController,
  );

router
  .route("/:notificationId")
  .get(validate(retrieveNotificationByIdValidation), retrieveNotificationById)
  .put(
    validate(updateNotificationValidation),
    authenticate,
    updateNotificationController,
  )
  .delete(
    validate(deleteNotificationValidation),
    authenticate,
    deleteNotificationController,
  );

export { router as notificationRoutes };