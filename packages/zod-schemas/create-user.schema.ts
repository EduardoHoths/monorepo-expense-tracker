import { z } from "zod";

export const createUserSchema = z.object({
  email: z
    .string({ required_error: "validations.register.email.required" })
    .min(1, "validations.register.email.min")
    .email("validations.register.email.email")
    .transform((email) => email.toLowerCase()),

  password: z
    .string({
      required_error: "validations.register.password.required",
    })
    .min(6, "validations.register.password.min"),

  name: z
    .string({
      required_error: "validations.register.name.required",
    })
    .min(2, "validations.register.name.min")
    .max(100, "validations.register.name.max")
    .trim(),
});
