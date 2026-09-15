import { Icons } from "@/constants/theme";
import { Host, Icon } from "@expo/ui";
import { StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
}

const ReturnCancelButton = ({ onPress }: Props) => (
  <Host matchContents style={styles.returnCancelButton}>
    <Icon
      name={Icons.arrowBack}
      size={40}
      color="white"
      onPress={onPress}
      style={{ backgroundColor: "#17202A", borderRadius: 32, padding: 5 }}
    />
  </Host>
);

export default ReturnCancelButton;

const styles = StyleSheet.create({
  returnCancelButton: { position: "absolute", top: 40, left: 32 },
});
