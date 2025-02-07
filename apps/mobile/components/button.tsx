import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className="bg-blue-500 p-2 rounded-md">
      <Text className="text-red-100 text-center">{title}</Text>
    </TouchableOpacity>
  );
}
