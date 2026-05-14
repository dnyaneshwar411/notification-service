import { NextFunction, Request, Response } from "express";
import { validateToken } from "../../core/services/token.service";

export const authenticate = async function(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1];

    const decodedPayload = await validateToken(token as string);

    (req as any).user = decodedPayload;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};
