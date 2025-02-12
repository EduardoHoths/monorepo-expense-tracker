import { TFunction } from "i18next";
import HttpStatusCode from "../../infra/http/types/http-status-code";

export class ValidationError extends Error {
  public statusCode: number;
  public errors: string[];

  constructor(errors: string[], t: TFunction) {
    super(t("validations.invalidFields"));

    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.name = "ValidationError";
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}
