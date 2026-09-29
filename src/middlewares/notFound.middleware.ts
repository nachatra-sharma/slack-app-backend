import type { NextFunction, Request, Response } from "express";

import { NotFoundError } from "../utils/error/error.utils.js";

export const NotFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
};
