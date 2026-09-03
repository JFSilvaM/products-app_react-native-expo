import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/theme/hooks/use-theme";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "default" | "defaultSemiBold" | "title" | "subtitle" | "link";
  themeColor?: ThemeColor;
};

export const ThemedText = ({
  style,
  type = "default",
  themeColor,
  ...rest
}: ThemedTextProps) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? "text"] },
        type === "default" && styles.default,
        type === "defaultSemiBold" && styles.defaultSemiBold,
        type === "title" && styles.title,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 600,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "KanitBold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
