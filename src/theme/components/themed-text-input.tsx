import { Host, Icon, IconName } from "@expo/ui";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "../hooks/use-theme";

interface Props extends TextInputProps {
  icon?: IconName;
}

const ThemedTextInput = ({ icon, ...rest }: Props) => {
  const primaryColor = useTheme().primary;
  const textColor = useTheme().text;

  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View
      style={{
        ...styles.border,
        borderColor: isActive ? primaryColor : "#ccc",
        gap: 10,
      }}
      onTouchStart={() => inputRef.current?.focus()}
    >
      {icon && (
        <Host matchContents>
          <Icon name={icon} size={24} color={textColor} />
        </Host>
      )}

      <TextInput
        ref={inputRef}
        placeholderTextColor="#5c5c5c"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        style={{ color: textColor, marginRight: 10, flex: 1 }}
        {...rest}
      />
    </View>
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
