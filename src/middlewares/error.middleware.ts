import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import { errorResponse } from "../utils/common/response.utils.js";
import { AppError } from "../utils/error/error.utils.js";

export const GenericErrorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) return next(error);
  if (error instanceof AppError) {
    if (error.statusCode >= 500) {
      console.error(`[${req.method} ${req.originalUrl}]`, error);
      return res
        .status(error.statusCode)
        .json(errorResponse(error.details ?? {}, error.message));
    }
  }
  if (error instanceof mongoose.Error.CastError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse({ field: error.path }, `Invalid ${error.path}`));
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const fields = Object.values(error.errors).map((e) => ({
      field: e.path,
      message: e.message
    }));
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(errorResponse(fields, "Validation failed"));
  }

  if (
    error instanceof mongoose.mongo.MongoServerError &&
    error.code === 11000
  ) {
    const field = Object.keys(error["keyValue"] ?? {})[0] ?? "field";
    return res
      .status(StatusCodes.CONFLICT)
      .json(errorResponse({ field }, `${field} already exists`));
  }

  console.error(`[${req.method} ${req.originalUrl}] Unhandled error:`, error);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(errorResponse({}, "Something went wrong. Please try again later."));
};
