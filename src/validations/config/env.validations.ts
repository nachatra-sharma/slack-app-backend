import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(["production", "development"]),
  DEV_DB_URL: z.url(),
  PROD_DB_URL: z.url()
});
