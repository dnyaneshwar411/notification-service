import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: Number,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  }
});

const User = model("User", userSchema);

export default User;
export type IUser = InferSchemaType<typeof userSchema> & { _id: Schema.Types.ObjectId | string };