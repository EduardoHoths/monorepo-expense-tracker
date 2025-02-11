import { View as NativeView, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

export function View({ children, className, ...props }: ViewProps) {
  return (
    <NativeView
      className={twMerge("bg-white dark:bg-gray-900", className)}
      {...props}
    >
      {children}
    </NativeView>
  );
}
