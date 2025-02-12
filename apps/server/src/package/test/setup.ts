import i18next from "i18next";
import { beforeAll } from "vitest";
import { resources } from "@expense/dictionaries";

beforeAll(async () => {
  await i18next.init({
    resources,
    fallbackLng: "en",
  });
});
