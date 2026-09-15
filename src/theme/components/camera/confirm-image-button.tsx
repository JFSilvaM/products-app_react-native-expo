import { Icons } from "@/constants/theme";
import { useTheme } from "@/theme/hooks/use-theme";
import { Host, Icon } from "@expo/ui";
import { useWindowDimensions } from "react-native";

interface Props {
  onPress: () => void;
}

const ConfirmImageButton = ({ onPress }: Props) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useTheme().primary;

  return (
    <Host
      matchContents
      style={{
        position: "absolute",
        bottom: 30,
        left: dimensions.width / 2 - 32,
      }}
    >
      <Icon
        name={Icons.checkmark}
        size={60}
        color={primaryColor}
        onPress={onPress}
        style={{
          backgroundColor: "white",
          borderRadius: 32,
          padding: 5,
          borderWidth: 4,
          borderColor: primaryColor,
        }}
      />
    </Host>
  );
};

export default ConfirmImageButton;
