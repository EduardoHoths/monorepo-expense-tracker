import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { twMerge } from "tailwind-merge";

export default function Input({ className, ...props }: TextInputProps) {
  return (
    <TextInput
      className={twMerge(
        "border w-full border-gray-300 px-4 py-3 rounded-md mb-2",
        className
      )}
      {...props}
    />
  );
}
