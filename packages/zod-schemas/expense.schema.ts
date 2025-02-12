import { z } from "zod";
import { ExpenseCategory, Filter } from "@expense/types";

export const createExpenseSchema = z.object({
  description: z
    .string({ message: "validations.expense.description.required" })
    .transform((description) => description.trim()),

  amount: z
    .number({ message: "validations.expense.amount.required" })
    .positive({ message: "validations.expense.amount.positive" }),

  date: z
    .string({ message: "validations.expense.date.required" })
    .transform((date) => {
      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        // throw new Error("validations.expense.date.format");
        throw new Error("InvalidDateFormat");
      }

      return date;
    }),

  category: z.nativeEnum(ExpenseCategory, {
    message: "validations.expense.category.invalid",
  }),
});

export const listExpenseSchema = z.object({
  filter: z
    .nativeEnum(Filter, {
      message: "validations.expense.filter.invalid",
    })
    .optional(),

  startDate: z
    .string()
    .transform((date) => {
      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        throw new Error("validations.expense.date.format");
      }

      return date;
    })
    .optional(),

  endDate: z
    .string()
    .transform((date) => {
      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        throw new Error("validations.expense.date.format");
      }

      return date;
    })
    .optional(),
});

export const updateExpenseSchema = z.object({
  description: z
    .string({ required_error: "validations.expense.description.required" })
    .optional()
    .transform((description) => description && description.trim()),

  amount: z
    .number({ message: "validations.expense.amount.required" })
    .positive({ message: "validations.expense.amount.positive" })
    .optional(),

  date: z
    .string()
    .optional()
    .transform((date) => {
      if (!date) return;

      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        throw new Error("validations.expense.date.format");
      }

      return date;
    }),

  category: z
    .nativeEnum(ExpenseCategory, {
      message: "validations.expense.category.invalid",
    })
    .optional(),
});
