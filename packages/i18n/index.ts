import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { resources } from "@expense/dictionaries";

export const i18nConfig = (languageDetector?: any) => {
  if (languageDetector) {
    return i18n.use(languageDetector).use(initReactI18next).init({
      resources,
      fallbackLng: "en",
    });
  }

  return i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "en",
  });
};
