import { Text, TouchableOpacity } from "react-native";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
}

export function Button({ title, onPress, className }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={twMerge("bg-blue-500 p-2 rounded-md", className)}
    >
      <Text className="text-red-100 text-center">{title}</Text>
    </TouchableOpacity>
  );
}
