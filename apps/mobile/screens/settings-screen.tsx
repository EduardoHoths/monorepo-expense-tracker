import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export function SettingsScreen() {
  const settingsOptions = [
    {
      title: "Account",
      icon: "person-outline",
      onPress: () => {},
    },
    {
      title: "Notifications",
      icon: "notifications-outline",
      onPress: () => {},
    },
    {
      title: "Privacy",
      icon: "lock-closed-outline",
      onPress: () => {},
    },
    {
      title: "Help & Support",
      icon: "help-circle-outline",
      onPress: () => {},
    },
    {
      title: "About",
      icon: "information-circle-outline",
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-2xl font-bold text-gray-800 mb-6">
            Settings
          </Text>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-4 border-b border-gray-200"
              onPress={option.onPress}
            >
              <Ionicons
                name={option.icon as keyof typeof Ionicons.glyphMap}
                size={24}
                className="text-gray-600"
              />
              <Text className="text-gray-800 text-lg ml-4">{option.title}</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                className="text-gray-400 ml-auto"
              />
            </TouchableOpacity>
          ))}{" "}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
