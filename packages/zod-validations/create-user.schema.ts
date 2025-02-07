import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .transform((email) => email.toLowerCase()),

  password: z.string().min(6, "Password must be at least 6 characters"),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
});
