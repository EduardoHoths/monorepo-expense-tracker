import { View } from "@/components/view";
import { useAuth } from "@/context/auth-context";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authSchema } from "@expense/zod-schemas";
import { Controller, useForm, useWatch } from "react-hook-form";
import ErrorMessage from "@/components/error-message";
import Input from "@/components/input";
import { Button } from "@/components/button";
import LoadingSpinner from "@/components/loading-spinner";
import { Text } from "@/components/text";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";


type FormData = z.infer<typeof authSchema>;

export function LoginScreen() {
  const { t } = useTranslation();

  const { login } = useAuth();

  const navigation = useNavigation();
  const [responseError, setResponseError] = useState<string | undefined>(
    undefined
  );

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

  const watchedFields = useWatch({ control, name: ["email", "password"] });

  useEffect(() => {
    if (responseError) {
      setResponseError(undefined);
    }
  }, [watchedFields[0], watchedFields[1]]);

  async function onSubmit(data: FormData) {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error("Erro de login", error);

      if (error instanceof AxiosError) {
        setResponseError(error.message);
      }
    }
  }

  return (
    <View className="flex-1 justify-center px-6">
      <Text className="text-3xl font-bold mb-2 dark:text-gray-100">
        {t("screens.login.title")}
      </Text>
      <Text className="text-gray-600 mb-6">{t("screens.login.subtitle")}</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={t("screens.login.placeholders.email")}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            error={!!errors.email}
          />
        )}
      />
      {errors.email && <ErrorMessage message={errors.email.message} />}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={t("screens.login.placeholders.password")}
            value={value}
            secureTextEntry
            onChangeText={onChange}
            error={!!errors.password}
          />
        )}
      />
      {errors.password && <ErrorMessage message={errors.password.message} />}

      {responseError && <ErrorMessage message={responseError} />}

      <Button
        onPress={handleSubmit(onSubmit)}
        className={`bg-black py-3 rounded-md flex items-center justify-center h-14 mb-2 ${
          isSubmitting ? "opacity-90" : ""
        }`}
        disabled={isSubmitting}
      >
        <Text className="font-bold text-white dark:text-white">
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

      <Text className="text-center mt-4 text-gray-600 dark:text-gray-300">
        {t("screens.login.signUp.text")}
        <Text
          className="text-blue-500 dark:text-blue-400"
          onPress={() => navigation.navigate("Register" as never)}
        >
          {t("screens.login.signUp.link")}
        </Text>
      </Text>
    </View>
  );
}
