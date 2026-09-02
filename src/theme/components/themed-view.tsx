import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/theme/hooks/use-theme";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export const ThemedView = ({
  style,
  lightColor,
  darkColor,
  type,
  ...otherProps
}: ThemedViewProps) => {
  const theme = useTheme();

  return (
    <View
      style={[{ backgroundColor: theme[type ?? "background"] }, style]}
      {...otherProps}
    />
  );
};
