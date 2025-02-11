import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface ErrorMessageProps extends TextProps {
  message: string | undefined;
}

export default function ErrorMessage({
  message,
  className,
  ...props
}: ErrorMessageProps) {
  return (
    <Text className={twMerge("text-red-500 mb-2 dark:text-red-400", className)} {...props}>
      {message}
    </Text>
  );
}
