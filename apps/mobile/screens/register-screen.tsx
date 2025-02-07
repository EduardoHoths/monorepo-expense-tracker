import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  function handleRegister() {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registering user:", email);
    // Aqui você pode chamar sua função de cadastro
  }

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-2">Register</Text>
      <Text className="text-gray-600 mb-6">Create an account to get started</Text>

      <TextInput
        className="border border-gray-300 px-4 py-3 rounded-md mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        className="border border-gray-300 px-4 py-3 rounded-md mb-4"
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        className="border border-gray-300 px-4 py-3 rounded-md mb-4"
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="bg-black py-3 rounded-md flex items-center mb-4"
      >
        <Text className="text-white font-bold">Register</Text>
      </TouchableOpacity>

      <Text className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <Text
          className="text-blue-500"
          onPress={() => navigation.navigate("Login" as never)}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}
