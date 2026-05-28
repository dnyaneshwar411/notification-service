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
  const { type, ...jobData } = payload;
  switch (type) {
    case "push":
      await pushQueue.add(jobId, jobData, retryAndBackOff);
      break;
    case "email":
      await emailQueue.add(jobId, jobData, retryAndBackOff);
      break;
    case "sms":
      await smsQueue.add(jobId, jobData, retryAndBackOff);
      break;
    default:
      break;
  }
})

export const publishEvent = function (payload: NotificationEventPayload) {
  eventBus.publish("notification", payload);
}