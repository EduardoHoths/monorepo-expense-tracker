import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { View } from "@/components/view";
import { Text } from "@/components/text";

export const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

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
    <View style={styles.container}>
      <Text>{t("screens.settings.language")}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => changeLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Português" value="pt" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 16,
  },
  picker: {
    height: 50,
  },
});
