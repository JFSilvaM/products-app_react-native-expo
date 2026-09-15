import { Icons } from "@/constants/theme";
import { Host, Icon } from "@expo/ui";
import { StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
}

const FlipCameraButton = ({ onPress }: Props) => (
  <Host matchContents style={styles.flipCameraButton}>
    <Icon
      name={Icons.cameraReverse}
      size={40}
      color="white"
      onPress={onPress}
      style={{ backgroundColor: "#17202A", borderRadius: 32, padding: 5 }}
    />
  </Host>
);

export default FlipCameraButton;

const styles = StyleSheet.create({
  flipCameraButton: { position: "absolute", bottom: 40, right: 32 },
});
