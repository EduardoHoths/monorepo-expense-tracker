import { Expense } from "../../../../domain/entities/expense/expense";
import { ExpenseCategory } from "@expense/types";
import { ExpenseRepository } from "../../../../domain/interfaces/expense-repository";
import { UserRepository } from "../../../../domain/interfaces/user-repository";
import { UserNotFoundError } from "../../../errors/user/user-not-found";
import { UseCase } from "../../../usecase";

interface CreateExpenseInputDTO {
  description: string;
  amount: number;
  date: Date;
  category: ExpenseCategory;
  userId: string;
  lang: string;
}

type CreateExpenseOutputDTO = Expense;

export class CreateExpenseUseCase
  implements UseCase<CreateExpenseInputDTO, CreateExpenseOutputDTO>
{
  constructor(
    private expenseRepository: ExpenseRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    description,
    amount,
    date,
    category,
    userId,
    lang,
  }: CreateExpenseInputDTO): Promise<Expense> {
    const user = await this.userRepository.findByUserId(userId);

    if (!user) {
      throw new UserNotFoundError(lang);
    }

    const expense = Expense.create({
      description,
      amount,
      date,
      category,
      userId,
    });

    return await this.expenseRepository.save(expense);
  }
}
