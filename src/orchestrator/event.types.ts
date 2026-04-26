// import { NotificationType, QueueTypes } from "../notification/types";

import { NotificationType, QueueTypes } from "../infrastructure/types";

export type EventType = "notification";

export type NotificationEvent = { type: QueueTypes } & NotificationType;
