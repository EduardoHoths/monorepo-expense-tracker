import { i18nConfig } from "@expense/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "react-native-localize";

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

const i18n = i18nConfig(languageDetector);

export default i18n;
