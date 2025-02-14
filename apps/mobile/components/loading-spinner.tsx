import { ActivityIndicator, View } from "react-native";


interface LoadingSpinnerProps {
  size?: "small" | "large" | number;
  color?: string;
}

export default function LoadingSpinner({
  color = "blue",
  size = "small",
}: LoadingSpinnerProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
