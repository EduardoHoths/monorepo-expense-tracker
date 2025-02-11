import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import { twMerge } from "tailwind-merge";

export function Button({
  className,
  children,
  ...props
}: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      className={twMerge("bg-blue-500 p-2 rounded-md dark:bg-blue-500", className)}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
