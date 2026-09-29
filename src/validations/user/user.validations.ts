import z from "zod";

export const userSignupRequestBodySchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { error: "Username is required" })
    .min(5, {
      error: "Username must be at least 5 characters"
    })
    .max(10, {
      error: "Username must be at most 10 characters"
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      error: "Username must contain only letters and numbers"
    }),
  email: z
    .string()
    .trim()
    .min(1, { error: "Email is required" })
    .pipe(z.email({ error: "Enter a valid email address" })),
  password: z
    .string()
    .min(1, { error: "Password is required" })
    .min(7, { error: "Password must be at least 7 characters" })
    .max(14, { error: "Password must be at most 14 characters" })
});

export const userUpdateRequestBodySchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { error: "Username is required" })
    .min(5, {
      error: "Username must be at least 5 characters"
    })
    .max(10, {
      error: "Username must be at most 10 characters"
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      error: "Username must contain only letters and numbers"
    })
    .optional(),
  email: z
    .string()
    .trim()
    .min(1, { error: "Email is required" })
    .pipe(z.email({ error: "Enter a valid email address" }))
    .optional(),
  avatar: z.string().optional()
});
