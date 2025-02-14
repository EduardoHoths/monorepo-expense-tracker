import "@/global.css";
import "./i18n";
import { AuthProvider } from "@/context/auth-context";
import { AppNavigator } from "@/navigation/app-navigator";
import Toast from "react-native-toast-message";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useColorScheme } from "nativewind";

import { Platform } from "react-native";
import { View } from "../components/view";

export default function App() {
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (Platform.OS === "web") {
      document.documentElement.classList.toggle("dark", colorScheme === "dark");
    }
  }, [colorScheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="pt-7"></View>
      <AuthProvider>
        <AppNavigator />
        <Toast />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
