import express, { Router } from "express";
import { notificationRoutes } from "./notification.routes";

const router: Router = express.Router();

const defaultRoutes = [{ path: "/notification", route: notificationRoutes }];

defaultRoutes.forEach((item) => {
  router.use(item.path, item.route);
});

export { router as v1Routes };
