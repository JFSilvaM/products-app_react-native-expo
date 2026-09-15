import { Icons } from "@/constants/theme";
import { Host, Icon } from "@expo/ui";
import { StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
}

const GalleryButton = ({ onPress }: Props) => (
  <Host matchContents style={styles.galleryButton}>
    <Icon
      name={Icons.gallery}
      size={40}
      color="white"
      onPress={onPress}
      style={{ backgroundColor: "#17202A", borderRadius: 32, padding: 5 }}
    />
  </Host>
);

export default GalleryButton;

const styles = StyleSheet.create({
  galleryButton: { position: "absolute", bottom: 40, left: 32 },
});
