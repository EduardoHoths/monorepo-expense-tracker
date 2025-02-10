import { register } from "@expense/register";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@expense/zod-schemas";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/loading-spinner";

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
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-2">
        {t("screens.signUp.title")}
      </Text>
      <Text className="text-gray-600 mb-6">{t("screens.signUp.subtitle")}</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={`border  px-4 py-3 rounded-md mb-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={t("screens.signUp.placeholders.name")}
            value={value}
            onChangeText={onChange}
            keyboardType="default"
          />
        )}
      />
      {errors.name && (
        <Text className="text-red-500 mb-2">{errors.name.message}</Text>
      )}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={`border  px-4 py-3 rounded-md mb-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={t("screens.signUp.placeholders.email")}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && (
        <Text className="text-red-500 mb-2">{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={`border  px-4 py-3 rounded-md mb-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={t("screens.signUp.placeholders.password")}
            value={value}
            secureTextEntry
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && (
        <Text className="text-red-500 mb-2">{errors.password.message}</Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className={`bg-black py-3 rounded-md flex items-center mb-2 ${
          isSubmitting ? "opacity-90" : ""
        }`}
        disabled={isSubmitting}
      >
        <Text className="text-white font-bold">
          {isSubmitting ? (
            <LoadingSpinner color="white" size={14} />
          ) : (
            t("screens.signUp.submitButton")
          )}
        </Text>
      </TouchableOpacity>

      <Text className="text-center mt-4 text-gray-600">
        {t("screens.signUp.login.text")}
        <Text
          className="text-blue-500"
          onPress={() => navigation.navigate("Login" as never)}
        >
          {t("screens.signUp.login.link")}
        </Text>
      </Text>
    </View>
  );
}
