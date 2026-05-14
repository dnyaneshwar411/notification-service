import { InferSchemaType, model, Schema } from "mongoose";

const notificationSchema = new Schema({
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  actor: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  entity: { // feature like - order, post, comments, etc.
    type: Schema.Types.ObjectId,
    // enum: []
  },
  entityModel: {
    type: String,
    enum: ["Order", "POST", "Comment"]
  },
  category: {
    type: String,
    enum: ["system", "promotional"],
    default: "system"
  },
  status: {
    type: String,
    default: "created",
    enum: ["created", "received", "read", "deleted"],
  },
  statusTimeLine: {
    type: Map,
    of: Date,
  },
  groupKey: {
    type: String
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
}, {
  timestamps: true,
  expires: "90d"
});

const Notification = model("Notification", notificationSchema);

export default Notification;

export type INotification = InferSchemaType<typeof notificationSchema>
// can implement templateId and templateData => better for localization and etc.