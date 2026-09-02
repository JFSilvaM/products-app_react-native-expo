import { ThemedText } from "@/theme/components/themed-text";
import { useTheme } from "@/theme/hooks/use-theme";
import { View } from "react-native";

const HomeScreen = () => {
  const primary = useTheme().primary;

  return (
    <View>
      <ThemedText style={{ color: primary }}>HomeScreen</ThemedText>
      <ThemedText font="regular">HomeScreen</ThemedText>
      <ThemedText font="bold">HomeScreen</ThemedText>
      <ThemedText font="thin">HomeScreen</ThemedText>
    </View>
  );
};

export default HomeScreen;
