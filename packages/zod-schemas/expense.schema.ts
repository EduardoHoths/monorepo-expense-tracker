import { z } from "zod";
import { ExpenseCategory, Filter } from "@expense/types";

export const createExpenseSchema = z.object({
  description: z
    .string({ message: "Description is required" })
    .transform((description) => description.trim()),

  amount: z
    .number({ message: "Amount is required" })
    .positive({ message: "Amount must be a positive number" }),

  date: z.string({ message: "Date is required" }).transform((date) => {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format");
    }

    return date;
  }),

  category: z.nativeEnum(ExpenseCategory, {
    message:
      "Invalid category. Must be one of: Groceries, Leisure, Electronics, Utilities, Clothing, Health, Other",
  }),
});

export const listExpenseSchema = z.object({
  filter: z
    .nativeEnum(Filter, {
      message:
        "Invalid filter. Must be one of: lastWeek, lastMonth, last3Months, custom",
    })
    .optional(),

  startDate: z
    .string()
    .transform((date) => {
      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format");
      }

      return date;
    })
    .optional(),

  endDate: z
    .string()
    .transform((date) => {
      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format");
      }

      return date;
    })
    .optional(),
});

export const updateExpenseSchema = z.object({
  description: z
    .string()
    .optional()
    .transform((description) => description && description.trim()),

  amount: z
    .number()
    .positive({ message: "Amount must be a positive number" })
    .optional(),

  date: z
    .string()
    .optional()
    .transform((date) => {
      if (!date) return;

      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format");
      }

      return date;
    }),

  category: z
    .nativeEnum(ExpenseCategory, {
      message:
        "Invalid category. Must be one of: Groceries, Leisure, Electronics, Utilities, Clothing, Health, Other",
    })
    .optional(),
});
