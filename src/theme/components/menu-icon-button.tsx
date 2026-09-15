import { Host, Icon, IconName } from "@expo/ui";
import { useTheme } from "../hooks/use-theme";

interface Props {
  icon: IconName;
  onPress: () => void;
}

const MenuIconButton = ({ icon, onPress }: Props) => {
  const primaryColor = useTheme().primary;

  return (
    <Host matchContents>
      <Icon name={icon} size={24} color={primaryColor} onPress={onPress} />
    </Host>
  );
};

export default MenuIconButton;
