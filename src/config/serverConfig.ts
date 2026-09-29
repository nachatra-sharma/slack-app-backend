import dotenv from "dotenv";
import z from "zod";

import { envSchema } from "../validations/config/env.validations.js";
dotenv.config();

function loadEnv() {
  const response = envSchema.safeParse(process.env);
  if (!response.success) {
    const prettyError = z.prettifyError(response.error);
    throw new Error(prettyError);
  } else {
    console.log("Successfully loaded environment variables");
    return response.data;
  }
}

const env = loadEnv();

export default env;
