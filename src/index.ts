import "./infrastructure";
import "./orchestrator/event.router";
import { publishEvent } from "./orchestrator/publisher";

setInterval(function () {
  // return 
  publishEvent("notification", {
    feature: "meal",
    queue: "sms",
    type: "sms",
    phone: "phone",
    message: "asdasdasdasd",
  });
  publishEvent("notification", {
    feature: "meal",
    queue: "push",
    type: "push",
    fcmToken: "asdsad",
    subject: "subject",
    message: "message",
  });
  publishEvent("notification", {
    feature: "meal",
    queue: "email",
    type: "email",
    sender: "",
    receiver: "",
    subject: "",
    message: "",
  });
}, 1000);
