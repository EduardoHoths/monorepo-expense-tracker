import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email format")
    .transform((email) => email.toLowerCase()),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),

  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
});
