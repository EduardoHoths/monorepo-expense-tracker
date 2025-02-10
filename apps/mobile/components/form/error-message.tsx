import { View, Text } from "react-native";
import React from "react";

interface ErrorMessageProps {
  message: string | undefined;
  className?: string;
}

export default function ErrorMessage({
  message,
  className,
}: ErrorMessageProps) {
  return <Text className={`text-red-500 mb-2 ${className}`}>{message}</Text>;
}
