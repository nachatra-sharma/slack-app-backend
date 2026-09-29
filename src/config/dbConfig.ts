import mongoose from "mongoose";

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from "./serverConfig.js";

export const connectToDB = async () => {
  try {
    if (NODE_ENV === "production") {
      await mongoose.connect(PROD_DB_URL as string);
    } else {
      await mongoose.connect(DEV_DB_URL as string);
    }
    console.log(
      `Connected to the database successfully for ${NODE_ENV === "production" ? "production" : "development"} environment`
    );
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};
