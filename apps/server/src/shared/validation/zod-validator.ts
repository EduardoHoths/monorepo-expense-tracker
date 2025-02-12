import { ZodSchema } from "zod";
import { Validator } from "./validator";
import { ValidationError } from "../errors/validation-error";
import { TFunction } from "i18next";

export class ZodValidator<T> implements Validator<T> {
  constructor(private schema: ZodSchema<T>) {}

  validate(data: any, t: TFunction): T {
    const result = this.schema.safeParse(data);

    if (!result.success) {
      throw new ValidationError(
        result.error.errors.map((error) => t(error.message)),
        t
      );
    }

    return result.data;
  }
}
