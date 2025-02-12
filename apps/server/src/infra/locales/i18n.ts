import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import { resources } from "@expense/dictionaries";

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "pt",
    preload: Object.keys(resources),
    resources,
    detection: {
      order: ["header", "querystring", "cookie"],
      caches: ["cookie"],
    },
  });

export default i18next;
export const i18nMiddleware = middleware.handle(i18next);
