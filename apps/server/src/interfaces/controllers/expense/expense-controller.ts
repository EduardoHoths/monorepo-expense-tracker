import { CreateExpenseUseCase } from "../../../application/use-cases/expense/create-expense/create-expense";
import { ExpensePresenter } from "../../presenters/expense-presenter";
import { ExpenseCategory, Filter } from "@expense/types";
import { HttpRequest } from "../../../shared/http/http-request";
import { HttpResponse } from "../../../shared/http/http-response";
import { Validator } from "../../../shared/validation/validator";
import HttpStatusCode from "../../../infra/http/types/http-status-code";
import { ControllerErrorHandler } from "../../errors/controller-error-handler";
import { ListExpensesUseCase } from "../../../application/use-cases/expense/list-expense/list-expense";
import { UpdateExpenseUseCase } from "../../../application/use-cases/expense/update-expense/update-expense";
import { DeleteExpenseUseCase } from "../../../application/use-cases/expense/delete-expense/delete-expense";
import i18next from "i18next";

interface CreateExpenseDTO {
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
}

interface UpdateExpenseDTO {
  description?: string;
  amount?: number;
  date?: string;
  category?: ExpenseCategory;
}

interface ListExpenseDTO {
  filter?: string;
  startDate?: string;
  endDate?: string;
}

export class ExpenseController {
  constructor(
    private createExpenseUseCase: CreateExpenseUseCase,
    private createExpenseValidator: Validator<CreateExpenseDTO>,
    private listExpenseUseCase: ListExpensesUseCase,
    private listExpenseValidator: Validator<ListExpenseDTO>,
    private updateExpenseUseCase: UpdateExpenseUseCase,
    private updateExpenseValidator: Validator<UpdateExpenseDTO>,
    private deleteExpenseUseCase: DeleteExpenseUseCase
  ) {}

  createExpense = async (req: HttpRequest): Promise<HttpResponse> => {
    try {
      const userId = req.user!.id;

      const lang = req.headers ? req.headers["accept-language"] : "en";

      const { description, amount, date, category } =
        this.createExpenseValidator.validate(req.body, req.t);

      const expense = await this.createExpenseUseCase.execute({
        description,
        amount,
        date: new Date(date),
        category,
        userId,
        lang,
      });

      const responseBody = ExpensePresenter.toJSON(expense);

      return {
        statusCode: HttpStatusCode.CREATED,
        body: {
          message: req.t("server.expense.create.success"),
          expense: responseBody,
        },
      };
    } catch (error: any) {
      return ControllerErrorHandler.handle(error, req.t);
    }
  };

  listExpense = async (req: HttpRequest): Promise<HttpResponse> => {
    try {
      const userId = req.user!.id;

      const { filter, startDate, endDate } = this.listExpenseValidator.validate(
        req.query,
        req.t
      ) as {
        filter?: Filter;
        startDate?: string;
        endDate?: string;
      };

      const expenses = await this.listExpenseUseCase.execute({
        userId,
        filter,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      });

      const responseBody = expenses.map((expense) =>
        ExpensePresenter.toJSON(expense)
      );

      return {
        statusCode: HttpStatusCode.OK,
        body: responseBody,
      };
    } catch (error) {
      return ControllerErrorHandler.handle(error, req.t);
    }
  };

  updateExpense = async (req: HttpRequest): Promise<HttpResponse> => {
    try {
      const userId = req.user!.id;

      const lang = req.headers ? req.headers["Accept-Language"] : "en";

      const { id } = req.params as { id: string };

      const { description, amount, date, category } =
        this.updateExpenseValidator.validate(req.body, req.t);

      const isNewDate = date && new Date(date);

      const expense = await this.updateExpenseUseCase.execute({
        description,
        amount,
        date: isNewDate ? isNewDate : undefined,
        category,
        userId,
        expenseId: id,
        lang,
      });

      const responseBody = ExpensePresenter.toJSON(expense);

      return {
        statusCode: HttpStatusCode.OK,
        body: {
          message: req.t("server.expense.update.success"),
          expense: responseBody,
        },
      };
    } catch (error) {
      return ControllerErrorHandler.handle(error, req.t);
    }
  };

  deleteExpense = async (req: HttpRequest): Promise<HttpResponse> => {
    try {
      const userId = req.user!.id;

      const lang = req.headers ? req.headers["Accept-Language"] : "en";

      const { id } = req.params as { id: string };

      await this.deleteExpenseUseCase.execute({
        userId,
        id,
        lang,
      });

      return {
        statusCode: HttpStatusCode.OK,
        body: {
          message: req.t("server.expense.delete.success"),
        },
      };
    } catch (error) {
      return ControllerErrorHandler.handle(error, req.t);
    }
  };
}
