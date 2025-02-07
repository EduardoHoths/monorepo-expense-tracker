import { authSchema } from "@expense/zod-schemas";
import { ZodValidator } from "../../shared/validation/zod-validator";

export const authValidator = new ZodValidator(authSchema);
