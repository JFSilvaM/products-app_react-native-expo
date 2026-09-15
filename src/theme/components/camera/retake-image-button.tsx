import { Icons } from "@/constants/theme";
import { Host, Icon } from "@expo/ui";
import { StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
}

const RetakeImageButton = ({ onPress }: Props) => (
  <Host matchContents style={styles.retakeImageButton}>
    <Icon
      name={Icons.close}
      size={40}
      color="white"
      onPress={onPress}
      style={{ backgroundColor: "#17202A", borderRadius: 32, padding: 5 }}
    />
  </Host>
);

export default RetakeImageButton;

const styles = StyleSheet.create({
  retakeImageButton: { position: "absolute", bottom: 40, right: 32 },
});
