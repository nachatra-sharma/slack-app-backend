import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodObject } from "zod";

import { ValidationError } from "../utils/error/error.utils.js";

export const validateRequestBody = (schema: ZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }));
        return next(new ValidationError("Invalid request body", fieldErrors));
      }
      next(error);
    }
  };
};
