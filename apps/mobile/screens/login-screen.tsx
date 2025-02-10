import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useAuth } from "../context/auth-context";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authSchema } from "@expense/zod-schemas";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../components/error-message";
import Input from "../components/input";
import { Button } from "../components/button";
import LoadingSpinner from "../components/loading-spinner";

type FormData = z.infer<typeof authSchema>;

export function LoginScreen() {
  const { t } = useTranslation();

  const { login } = useAuth();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      await login(data.email, data.password);
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

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            className={errors.email ? "border-red-500" : "border-gray-300"}
            placeholder={t("screens.login.placeholders.email")}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <ErrorMessage message={errors.email.message} />}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            className={errors.password ? "border-red-500" : "border-gray-300"}
            placeholder={t("screens.login.placeholders.password")}
            value={value}
            secureTextEntry
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <ErrorMessage message={errors.password.message} />}

      <Button
        onPress={handleSubmit(onSubmit)}
        className={`bg-black py-3 rounded-md flex items-center mb-2 ${
          isSubmitting ? "opacity-90" : ""
        }`}
        disabled={isSubmitting}
      >
        <Text className="text-white font-bold">
          {isSubmitting ? (
            <LoadingSpinner size={14} color="white" />
          ) : (
            t("screens.login.submitButton")
          )}
        </Text>
      </Button>

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
