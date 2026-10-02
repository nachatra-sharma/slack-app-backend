import express from "express";

import healthCheckupRouter from "./health-checkup.js";
import userRouter from "./users/userRouter.js";

const v1Router = express.Router();

v1Router.use("/users", userRouter);

v1Router.use("/health-checkup", healthCheckupRouter);

export default v1Router;
