import { CreateUserUseCase } from "../../../application/use-cases/user/create-user/create-user";
import { UserPresenter } from "../../presenters/user-presenter";
import { Validator } from "../../../shared/validation/validator";
import { HttpRequest } from "../../../shared/http/http-request";
import { HttpResponse } from "../../../shared/http/http-response";
import HttpStatusCode from "../../../infra/http/types/http-status-code";
import { ControllerErrorHandler } from "../../errors/controller-error-handler";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private createUserValidator: Validator<CreateUserDTO>
  ) {}

  public createUser = async (req: HttpRequest): Promise<HttpResponse> => {
    try {
      const lang = req.headers ? req.headers["Accept-Language"] : "en";

      const { email, name, password } = this.createUserValidator.validate(
        req.body,
        req.t
      );

      const user = await this.createUserUseCase.execute({
        email,
        name,
        password,
        lang
      });

      const responseBody = UserPresenter.toJSON(user);

      return {
        statusCode: HttpStatusCode.CREATED,
        body: {
          message: req.t("server.register.success"),
          user: responseBody,
        },
      };
    } catch (error: any) {
      return ControllerErrorHandler.handle(error, req.t);
    }
  };
}
