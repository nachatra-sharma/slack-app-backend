import mongoose from "mongoose";

import env from "./serverConfig.js";

export const connectToDB = async () => {
  const DB_URL =
    env.NODE_ENV === "production" ? env.PROD_DB_URL : env.DEV_DB_URL;

  mongoose.connection.on("error", (err) => {
    console.log(`Error connecting to the database: ${err.message}`);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from the database");
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected to the database");
  });

  await mongoose.connect(DB_URL);

  console.log(
    `Connected to the database successfully for ${env.NODE_ENV === "production" ? "production" : "development"} environment`
  );
};
