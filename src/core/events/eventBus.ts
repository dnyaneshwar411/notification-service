import EventEmitter from "node:events";
import { emailQueue, pushQueue, retryAndBackOff, smsQueue } from "../../infrastructure/queue/queue";
import { generateJobId } from "./utils";
import { EventTypes, NotificationEventPayload } from "../../shared/types/notification";
class EventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
  }

  publish(event: EventTypes, payload: NotificationEventPayload) {
    return this.emit(event, payload);
  }

  async subscribe(
    event: EventTypes,
    callback: (payload: NotificationEventPayload) => void | Promise<void>
  ) {
    this.on(event, callback);
  }
}

const eventBus = new EventBus();

eventBus.subscribe("notification", async function (payload: NotificationEventPayload) {
  const jobId = generateJobId({ queue: payload.type });
  switch (payload.type) {
    case "push":
      pushQueue.add(jobId, payload, retryAndBackOff);
    case "email":
      emailQueue.add(jobId, payload, retryAndBackOff);
    case "sms":
      smsQueue.add(jobId, payload, retryAndBackOff);
    default:
      break;
  }
})

export const publishEvent = function (payload: NotificationEventPayload) {
  eventBus.publish("notification", payload);
}