import "../global.css";
import { AuthProvider } from "../context/auth-context";
import { AppNavigator } from "../navigation/app-navigator";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast />
    </AuthProvider>
  );
}
