import { ThemedText } from "@/theme/components/themed-text";
import { useTheme } from "@/theme/hooks/use-theme";
import { View } from "react-native";

const HomeScreen = () => {
  const primary = useTheme().primary;

  return (
    <View>
      <ThemedText style={{ color: primary }}>HomeScreen</ThemedText>
      <ThemedText>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: "KanitRegular" }}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: "KanitBold" }}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: "KanitThin" }}>HomeScreen</ThemedText>
    </View>
  );
};

export default HomeScreen;
