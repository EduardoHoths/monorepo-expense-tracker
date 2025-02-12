import swaggerUi from "swagger-ui-express";
import express from "express";
import bodyParser from "body-parser";
import { userRoutes } from "./routes/user/user-routes";
import { expenseRoutes } from "./routes/expense/expense-routes";
import { authRoutes } from "./routes/auth/auth-routes";
import { swaggerDocument } from "../config/swagger";
import http from "http";
import cors from "cors";
import { i18nMiddleware } from "../../locales/i18n";

export default class Server {
  public app: express.Application;
  private server: http.Server | null = null;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(i18nMiddleware);
  }

  private configureRoutes() {
    this.app.use("/users", userRoutes);
    this.app.use("/expenses", expenseRoutes);
    this.app.use("/auth", authRoutes);
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  public start() {
    const port = process.env.PORT || 3000;
    this.server = this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  public stop() {
    if (this.server) {
      this.server.close();
    }
  }
}
