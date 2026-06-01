import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { ApiError } from "./api/utils/apiError";
import {
  errorConverter,
  errorHandler,
} from "./api/middlewares/error.middleware";
import { v1Routes } from "./api/routes/v1";

const app: Express = express();

// security middlewares
// => helmet, xss, mongo sanitize, compression

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.options("*", cors());
app.use("/", function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const timeStart = performance.now();
  res.on("finish", () => {
    const timeEnd = performance.now();
    console.log(
      req.method,
      "----",
      req.originalUrl,
      "----",
      res.statusCode,
      "----",
      (timeEnd - timeStart).toFixed(2) + "ms",
    );
  });
  next();
})

app.use("/v1", v1Routes);

app.use((_, __, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// import routes
// handle rate limiting if required

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
