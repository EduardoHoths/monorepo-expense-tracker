import "@/global.css";
import "./i18n";
import { AuthProvider } from "@/context/auth-context";
import { AppNavigator } from "@/navigation/app-navigator";
import Toast from "react-native-toast-message";
import { ThemeProvider } from "@/context/theme-context";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
        <Toast />
      </AuthProvider>
    </ThemeProvider>
  );
}
