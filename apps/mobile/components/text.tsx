import { Text as NativeText, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

export function Text({ className, children, ...props }: TextProps) {
  return (
    <NativeText
      className={twMerge("text-black dark:text-gray-100", className)}
      {...props}
    >
      {children}
    </NativeText>
  );
}
