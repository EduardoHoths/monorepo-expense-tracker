import { StyleSheet } from "react-native";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/button";
import { View } from "@/components/view"
import { Text } from "@/components/text";

export function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {user?.email}!</Text>
      <Text>{user?.userId}</Text>
      <Button onPress={logout}>
        <Text className="text-white">Sair</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 16 },
});
