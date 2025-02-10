import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../context/auth-context";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export function LoginScreen() {
  const { t } = useTranslation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigation = useNavigation();

  async function handleLogin() {
    try {
      await login(email, password);
    } catch (error) {
      console.error("Erro de login", error);
    }
  }

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-2">
        {t("screens.login.title")}
      </Text>
      <Text className="text-gray-600 mb-6">{t("screens.login.subtitle")}</Text>

      <TextInput
        className="border border-gray-300 px-4 py-3 rounded-md mb-4"
        placeholder={t("screens.login.placeholders.email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        className="border border-gray-300 px-4 py-3 rounded-md mb-4"
        placeholder={t("screens.login.placeholders.password")}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-black py-3 rounded-md flex items-center mb-4"
      >
        <Text className="text-white font-bold">
          {t("screens.login.submitButton")}
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity>
        <Text className="text-blue-500 text-center">
          {t("screens.login.forgotPassword")}
        </Text>
      </TouchableOpacity> */}

      <Text className="text-center mt-4 text-gray-600">
        {t("screens.login.signUp.text")}
        <Text
          className="text-blue-500"
          onPress={() => navigation.navigate("Register" as never)}
        >
          {t("screens.login.signUp.link")}
        </Text>
      </Text>
    </View>
  );
}
