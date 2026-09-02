import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/theme/hooks/use-theme";
import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  font?: "regular" | "bold" | "thin";
  themeColor?: ThemeColor;
};

export const ThemedText = ({
  style,
  font = "regular",
  themeColor,
  ...rest
}: ThemedTextProps) => {
  const theme = useTheme();
  const fontFamily =
    font === "bold"
      ? "KanitBold"
      : font === "thin"
        ? "KanitThin"
        : "KanitRegular";

  return (
    <Text
      style={[{ color: theme[themeColor ?? "text"], fontFamily }, style]}
      {...rest}
    />
  );
};
