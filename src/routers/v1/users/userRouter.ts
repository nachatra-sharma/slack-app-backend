import express from "express";
import { StatusCodes } from "http-status-codes";

const userRouter = express.Router();

userRouter.get("/", (_req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Successfully fetched all users.",
    data: {},
    error: {}
  });
});

export default userRouter;
