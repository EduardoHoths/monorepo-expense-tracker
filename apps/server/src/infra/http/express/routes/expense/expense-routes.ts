import { Router } from "express";
import { ExpenseController } from "../../../../../interfaces/controllers/expense/expense-controller";
import { CreateExpenseUseCase } from "../../../../../application/use-cases/expense/create-expense/create-expense";
import { UpdateExpenseUseCase } from "../../../../../application/use-cases/expense/update-expense/update-expense";
import {
  createExpenseValidator,
  listExpenseValidator,
  updateExpenseValidator
} from "../../../../../validation/expense/expense-validator.zod";
import { expressAdapter } from "../../adapters/express-adapter";
import { createUserRepository } from "../../../../database/user-repository/user-repository-factory";
import { createExpenseRepository } from "../../../../database/expense-repository/expense-repository-factory";
import { AuthMiddleware } from "../../middlewares/auth-middleware";
import { ListExpensesUseCase } from "../../../../../application/use-cases/expense/list-expense/list-expense";
import { DeleteExpenseUseCase } from "../../../../../application/use-cases/expense/delete-expense/delete-expense";

// Repositories
const userRepository = createUserRepository();
const expenseRepository = createExpenseRepository();

// Use Cases
const createExpenseUseCase = new CreateExpenseUseCase(
  expenseRepository,
  userRepository
);

const listExpenseUseCase = new ListExpensesUseCase(expenseRepository);

const updateExpenseUseCase = new UpdateExpenseUseCase(
  expenseRepository,
  userRepository
);

const deleteExpenseUseCase = new DeleteExpenseUseCase(
  expenseRepository,
  userRepository
);

// Controllers
const expenseController = new ExpenseController(
  createExpenseUseCase,
  createExpenseValidator,
  listExpenseUseCase,
  listExpenseValidator,
  updateExpenseUseCase,
  updateExpenseValidator,
  deleteExpenseUseCase
);

const authMiddleware = new AuthMiddleware();

// Routes
const expenseRoutes = Router();

expenseRoutes.post(
  "/create",
  authMiddleware.execute.bind(authMiddleware),
  expressAdapter(expenseController.createExpense)
);

expenseRoutes.get(
  "/list",
  authMiddleware.execute.bind(authMiddleware),
  expressAdapter(expenseController.listExpense)
);

expenseRoutes.patch(
  "/update/:id",
  authMiddleware.execute.bind(authMiddleware),
  expressAdapter(expenseController.updateExpense)
);

expenseRoutes.delete(
  "/delete/:id",
  authMiddleware.execute.bind(authMiddleware),
  expressAdapter(expenseController.deleteExpense)
);

export { expenseRoutes };
