import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { NODE_ENV } from "../config";
export const errorHandler = async (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError) {
    if (NODE_ENV === "development") {
      res.status(err.statusCode).json({
        name: err.name,
        message: err.message,
        stack: err.stack,
      });
    } else {
      res.status(err.statusCode).json({
        message: err.message,
      });
    }
  }

  if (err instanceof Error) {
    if (NODE_ENV === "development") {
      res.status(500).json({
        name: err.name,
        message: err.message,
        stack: err.stack,
      });
      console.error(err);
    } else {
      res.status(500).json({
        message: "Internal server error!",
      });
      console.error(err);
    }
  }
};
