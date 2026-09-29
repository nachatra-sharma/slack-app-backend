import express, { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

import { connectToDB } from "./config/dbConfig.js";
import { PORT } from "./config/serverConfig.js";
import router from "./routers/apiRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get("/ping", (_req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "pong"
  });
});

app.listen(PORT, async () => {
  console.log("Server is running on port 3000");
  await connectToDB();
});
