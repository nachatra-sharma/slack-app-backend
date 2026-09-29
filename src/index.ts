import express from "express";

import { connectToDB } from "./config/dbConfig.js";
import env from "./config/serverConfig.js";
import { GenericErrorHandler } from "./middlewares/error.middleware.js";
import { NotFoundHandler } from "./middlewares/notFound.middleware.js";
import apiRouter from "./routers/apiRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use(NotFoundHandler);
app.use(GenericErrorHandler);

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(env.PORT, async () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
