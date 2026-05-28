import mongoose from "mongoose";
import { env } from "../config/envVars";

mongoose
  .connect(env.MONGOOSE_DB_URL)
  .then(() => {
    console.log("db connected");
    require("./worker")
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });