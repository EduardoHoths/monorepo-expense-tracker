import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { twMerge } from "tailwind-merge";

interface InputProps extends TextInputProps {
  error?: boolean;
}

export default function Input({ className, error, ...props }: InputProps) {
  return (
    <TextInput
      className={twMerge(
        `border w-full px-4 py-3 rounded-md mb-2 dark:placeholder:text-gray-400 dark:text-white ${
          error ? "border-red-500 dark:border-red-400" : "border-gray-300"
        }`,
        className
      )}
      {...props}
    />
  );
}
