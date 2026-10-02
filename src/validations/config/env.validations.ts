import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(["production", "development"]),
  DEV_DB_URL: z.url(),
  PROD_DB_URL: z.url(),
  JWT_SECRET: z.string().min(1, { error: "JWT_SECRET is required" }),
  JWT_EXPIRES_IN: z.enum(["1d", "1h", "1m", "1s"]).default("1d")
});
