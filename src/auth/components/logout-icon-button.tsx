import { Icons } from "@/constants/theme";
import { useTheme } from "@/theme/hooks/use-theme";
import { Host, Icon } from "@expo/ui";
import { useAuthStore } from "../store/use-auth-store";

const LogoutIconButton = () => {
  const primaryColor = useTheme().primary;
  const { logout } = useAuthStore();

  return (
    <Host matchContents style={{ marginRight: 8 }}>
      <Icon
        name={Icons.logout}
        size={24}
        color={primaryColor}
        onPress={logout}
      />
    </Host>
  );
};

export default LogoutIconButton;
