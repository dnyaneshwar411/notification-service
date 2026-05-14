import jwt from "jsonwebtoken";
import { env } from "../../config/envVars";

// create a token, validate the token
export const createToken = async function(payload: Record<string, any>) {
  const token = jwt.sign(payload, env.JWT_SECRET_TOKEN);
  return token;
};

export const validateToken = async function(token: string) {
  const payload = jwt.verify(token, env.JWT_SECRET_TOKEN)
  return payload
};
