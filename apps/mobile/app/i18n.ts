import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "react-native-localize";
import { resources } from "@expense/dictionaries";

const getStoredLanguage = async () => {
  const storedLang = await AsyncStorage.getItem("language");
  return storedLang || Localization.getLocales()[0].languageTag || "en";
};

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: async (callback: (lang: string) => void) => {
    const language = await getStoredLanguage();
    callback(language);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "pt"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
