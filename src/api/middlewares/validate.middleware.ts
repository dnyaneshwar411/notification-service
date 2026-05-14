import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { ApiError } from "../utils/apiError";
import { pick } from "../../utils/pick";
import { ZodIssue } from "zod/v3";

export const validate = function(schema: ZodObject) {
  return function(req: Request, res: Response, next: NextFunction) {
    try {
      const validSchema = pick(schema, ["body", "query", "params"]);
      const objectToBeValidated = pick(req, Object.keys(validSchema));

      const result = validSchema.safeParse(objectToBeValidated);

      if (!result.success) {
        const errorMessage = result.error.issues
          .map(
            (details: ZodIssue) =>
              `${details.path.join(".")}: ${details.message}`,
          )
          .join(", ");

        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message || "Something went wrong"
          : "Something went wrong";
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
  };
};
