import EventEmitter from "node:events";
import { EventTypes } from "./config";

class EventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
  }

  publish(event: EventTypes, payload: any) {
    return this.emit(event, payload);
  }

  async subscribe(event: EventTypes, callback: (payload: any) => void | Promise<void>) {
    this.on(event, callback);
  }
}

export const eventBus = new EventBus();

eventBus.subscribe("notification", async function () {
  // create a job for the same
  // using the interface of publisher.
})