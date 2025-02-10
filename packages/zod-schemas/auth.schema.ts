import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .transform((email) => email.toLowerCase()),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
