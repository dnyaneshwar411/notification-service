import { myEmitter } from "./event.router";
import { EventType, NotificationEvent } from "./event.types";

export const publishEvent = function <T extends NotificationEvent>(
  eventType: EventType,
  config: T,
) {
  myEmitter.emit("event", eventType, config);
};
