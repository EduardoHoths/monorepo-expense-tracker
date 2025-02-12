import { t } from "i18next";
import HttpStatusCode from "../../../infra/http/types/http-status-code";
import { AppBaseError } from "../app-error-base";

export class UserAlreadyExistsError extends AppBaseError {
  constructor(lang: string) {
    super({
      message: t("server.register.error.alreadyExists", { lng: lang }),
      statusCode: HttpStatusCode.CONFLICT,
      name: "UserAlreadyExistsError",
    });
  }
}
