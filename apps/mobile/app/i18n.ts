import { i18nConfig } from "@expense/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";

const getStoredLanguage = async () => {
  const storedLang = await AsyncStorage.getItem("language");
  const deviceLanguage = getLocales()[0].languageCode;
  return storedLang || deviceLanguage || "en";
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
