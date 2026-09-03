import { Host, Icon, IconName } from "@expo/ui";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { useTheme } from "../hooks/use-theme";

interface Props extends PressableProps {
  children: string;
  icon?: IconName;
}

const ThemedButton = ({ children, icon, style, ...rest }: Props) => {
  const primaryColor = useTheme().primary;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? primaryColor + "90" : primaryColor,
          ...style,
        },
        styles.button,
      ]}
    >
      <Text style={{ color: "white" }}>{children}</Text>

      {icon && (
        <Host matchContents>
          <Icon name={icon} size={24} color="white" />
        </Host>
      )}
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
