import { useTheme } from "@/theme/hooks/use-theme";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = useTheme().background;
  const [loaded] = useFonts({
    KanitRegular: require("@/assets/fonts/Kanit-Regular.ttf"),
    KanitBold: require("@/assets/fonts/Kanit-Bold.ttf"),
    KanitThin: require("@/assets/fonts/Kanit-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </View>
  );
};

export default RootLayout;
