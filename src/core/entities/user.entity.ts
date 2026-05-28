import { Schema } from "mongoose";
import User from "../../infrastructure/database/models/user.model";

export const getUserById = async function (
  userId: Schema.Types.ObjectId | string,
  fields: string = ""
) {
  const user = await User
    .findById(userId)
    .select(fields)
    .lean();
  return user
}