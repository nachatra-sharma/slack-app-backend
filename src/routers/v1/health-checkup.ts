import express, { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

import { successResponse } from "../../utils/common/response.utils.js";

const healthCheckupRouter = express.Router();

healthCheckupRouter.get("/", (_req: Request, res: Response) => {
  return res
    .status(StatusCodes.OK)
    .json(successResponse({}, "Server is up and running."));
});

export default healthCheckupRouter;
