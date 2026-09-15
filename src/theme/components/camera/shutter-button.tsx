import { useTheme } from "@/theme/hooks/use-theme";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

interface Props {
  onPress: () => void;
}

const ShutterButton = ({ onPress }: Props) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useTheme().primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
    />
  );
};

export default ShutterButton;

const styles = StyleSheet.create({
  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
