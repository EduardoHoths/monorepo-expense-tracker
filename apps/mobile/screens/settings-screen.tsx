import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { View } from "@/components/view";
import { Text } from "@/components/text";
import { Button } from "../components/button";
import { useAuth } from "../context/auth-context";
import { useColorScheme } from "nativewind";

export const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const { logout } = useAuth();
  const { colorScheme, setColorScheme } = useColorScheme();

  const changeLanguage = async (language: string) => {
    try {
      await AsyncStorage.setItem("userLanguage", language);
      await i18n.changeLanguage(language);
      setSelectedLanguage(language);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  return (
    <View className="pt-10">
      <Text>{t("screens.settings.language")}</Text>
      <View>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => changeLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Português" value="pt" />
        </Picker>
      </View>

      <View>
        <Picker
          onValueChange={(itemValue: "light" | "dark") =>
            setColorScheme(itemValue)
          }
          selectedValue={colorScheme}
        >
          <Picker.Item label="light" value="light" />
          <Picker.Item label="dark" value="dark" />
        </Picker>
      </View>

      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
};
