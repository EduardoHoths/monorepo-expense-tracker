import { ZodValidator } from "../../shared/validation/zod-validator";
import { createUserSchema } from "@expense/zod-schemas";

export const createUserValidator = new ZodValidator(createUserSchema);
