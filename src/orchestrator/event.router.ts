import { EventEmitter } from "node:events";
import { EventType, NotificationEvent } from "./event.types";
import { addJob } from "../infrastructure/publisher";

class MyEmitter extends EventEmitter { }

export const myEmitter = new MyEmitter();

myEmitter.on("event", function <Config>(eventType: EventType, config: Config) {
  switch (eventType) {
    case "notification":
      const { type, ...jobConfig } = config as NotificationEvent;
      return addJob(type, jobConfig);
    default:
      throw new Error();
  }
});
