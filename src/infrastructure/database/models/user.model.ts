import bcrypt from "bcryptjs";
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
  },
  fcmToken: {
    type: String,
    trim: true,
    lowercase: true
  }
});

userSchema.pre("save", async function () {
  const user = this;

  if (!user.isModified("password")) {
    return;
  }

  try {
    const SALT_ROUNDS = 10;
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  } catch (error: any) {
    throw error
  }
});

const User = model("User", userSchema);

export default User;
export type IUser = InferSchemaType<typeof userSchema> & { _id: Schema.Types.ObjectId | string };