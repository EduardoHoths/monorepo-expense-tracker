import { TFunction } from "i18next";

export interface Validator<T> {
  validate(data: any, t: TFunction): T;
}
