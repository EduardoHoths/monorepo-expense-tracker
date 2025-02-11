import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({ required_error: "validations.auth.email.required" })
    .min(1, "validations.auth.email.min")
    .email("validations.auth.email.email")
    .transform((email) => email.toLowerCase()),
  password: z
    .string({ required_error: "validations.auth.password.required" })
    .min(6, "validations.auth.password.min"),
});
