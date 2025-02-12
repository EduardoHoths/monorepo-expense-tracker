import { t } from "i18next";
import HttpStatusCode from "../../../infra/http/types/http-status-code";
import { AppBaseError } from "../app-error-base";

export class ExpenseNotFoundError extends AppBaseError {
  constructor(lang: string) {
    super({
      message: t("server.expense.error.notFound", { lng: lang }),
      statusCode: HttpStatusCode.NOT_FOUND,
      name: "ExpenseNotFoundError",
    });
  }
}
