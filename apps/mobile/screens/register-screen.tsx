import { register } from "@expense/register";
import { View } from "@/components/view";
import { Text } from "@/components/text";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@expense/zod-schemas";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/components/loading-spinner";
import Input from "@/components/input";
import ErrorMessage from "@/components/error-message";
import { Button } from "@/components/button";
import { AxiosError } from "axios";

type FormData = z.infer<typeof createUserSchema>;

export function RegisterScreen() {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await register(data.name, data.email, data.password);

      Toast.show({
        type: "success",
        text1: "Registro concluído!",
        text2: "Agora faça login para acessar sua conta",
        visibilityTime: 2000,
        autoHide: true,
        text1Style: {
          fontSize: 15,
        },
        text2Style: {
          fontSize: 14,
        },
      });

      setTimeout(() => {
        navigation.navigate("Login" as never);
      }, 2000);
    } catch (error) {
      console.error("Error registering user:", error);

      if (error instanceof AxiosError) {
        Toast.show({
          type: "error",
          text1: "Erro ao registrar usuário",
          text2: error.message,
          visibilityTime: 2000,
          autoHide: true,
          text1Style: {
            fontSize: 15,
          },
          text2Style: {
            fontSize: 14,
          },
        });
      }
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <View>
        <Text className="text-3xl font-bold mb-2 dark:text-white">
          {t("screens.signUp.title")}
        </Text>
        <Text className="text-gray-600 mb-6">
          {t("screens.signUp.subtitle")}
        </Text>
      </View>

      <View>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder={t("screens.signUp.placeholders.name")}
              value={value}
              onChangeText={onChange}
              keyboardType="default"
              error={!!errors.name}
            />
          )}
        />
        {errors.name && <ErrorMessage message={errors.name.message} />}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder={t("screens.signUp.placeholders.email")}
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
              placeholder={t("screens.signUp.placeholders.password")}
              value={value}
              secureTextEntry
              onChangeText={onChange}
              error={!!errors.password}
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
              t("screens.signUp.submitButton")
            )}
          </Text>
        </Button>
      </View>

      <View>
        <Text className="text-center mt-4 text-gray-600 dark:text-gray-400">
          {t("screens.signUp.login.text")}
          <Text
            className="text-blue-500 dark:text-blue-400"
            onPress={() => navigation.navigate("Login" as never)}
          >
            {t("screens.signUp.login.link")}
          </Text>
        </Text>
      </View>
    </View>
  );
}
