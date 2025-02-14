import React from "react";
import { FlatList, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { View } from "@/components/view";
import { Text } from "@/components/text";

import { useAuth } from "@/context/auth-context";
import { useColorScheme } from "nativewind";

export const HomeScreen = () => {
  const { colorScheme } = useColorScheme();
  const { user } = useAuth();

  const transactions = [
    {
      id: "1",
      title: "STM",
      category: "Transport",
      date: "Feb 16, 2022",
      amount: "-$6.50",
    },
    {
      id: "2",
      title: "STM",
      category: "Transport",
      date: "Feb 16, 2022",
      amount: "-$6.50",
    },
    {
      id: "3",
      title: "Uber",
      category: "Ride",
      date: "Feb 15, 2022",
      amount: "-$12.30",
    },
    {
      id: "4",
      title: "Groceries",
      category: "Food",
      date: "Feb 14, 2022",
      amount: "-$45.20",
    },
    {
      id: "5",
      title: "Netflix",
      category: "Entertainment",
      date: "Feb 13, 2022",
      amount: "-$8.99",
    },
    {
      id: "6",
      title: "Coffee",
      category: "Food",
      date: "Feb 12, 2022",
      amount: "-$3.50",
    },
  ];

  return (
    <View className="flex-1 p-5">
      {/* Header */}
      <View className="flex-row items-center mb-5">
        <Ionicons
          name="person-circle-outline"
          size={40}
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
        <Text className="text-lg ml-2">
          Hi, <Text className="capitalize">{user?.name}</Text>
        </Text>
      </View>

      <View className="rounded-xl bg-[#1E1E1E] dark:bg-[#1E1E1E] p-3">
        <View
          className="flex flex-row items-end justify-end "
          style={{ backgroundColor: "inherit" }}
        >
          <Text className="text-2xl my-2 mx-2 text-white">$991.78</Text>
        </View>

        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{ data: [300, 450, 350, 600, 700, 991] }],
          }}
          width={Dimensions.get("window").width - 64} 
          height={160}
          yAxisLabel="$"
          withDots={false}
          withInnerLines={false}
          chartConfig={{
            backgroundGradientFrom: "#1E1E1E",
            backgroundGradientTo: "#1E1E1E",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
          }}
          style={{ marginTop: 10, borderRadius: 10 }}
        />
      </View>

      <View className="flex-row justify-between items-center mt-5">
        <Text className="text-xl">Recent Expenses</Text>
        {/* <TouchableOpacity className="px-3 py-1 bg-gray-700 rounded-md">
          <Text className="text-gray-300 text-sm">📅 01 May - 16 Apr</Text>
        </TouchableOpacity> */}
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center mb-4 border-b border-gray-300 dark:border-gray-800  pb-3">
            <View className="w-10 h-10 rounded-full border-2 border-gray-300 mr-3" />
            <View className="flex-1">
              <Text className="text-white text-base">{item.title}</Text>
              <Text className="text-gray-400 text-xs">{item.category}</Text>
              <Text className="text-gray-400 text-xs">{item.date}</Text>
            </View>
            <Text className="dark:text-inherit text-red-400 text-base">{item.amount}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};
