import { ZodValidator } from "../../shared/validation/zod-validator";
import {
  createExpenseSchema,
  listExpenseSchema,
  updateExpenseSchema,
} from "@expense/zod-schemas";

export const createExpenseValidator = new ZodValidator(createExpenseSchema);
export const listExpenseValidator = new ZodValidator(listExpenseSchema);
export const updateExpenseValidator = new ZodValidator(updateExpenseSchema);
