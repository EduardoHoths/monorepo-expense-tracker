import HttpStatusCode from "../../../infra/http/types/http-status-code";
import { AppBaseError } from "../app-error-base";
import { t } from "i18next";

export class InvalidCredentialsError extends AppBaseError {
  constructor(lang: string) {
    super({
      message: t("server.auth.invalidCredentials", { lng: lang }),
      statusCode: HttpStatusCode.UNAUTHORIZED,
      name: "InvalidCredentialsError",
    });
  }
}
