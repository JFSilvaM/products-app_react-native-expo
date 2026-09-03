import { useAuthStore } from "@/auth/store/use-auth-store";
import { ThemedView } from "@/theme/components/themed-view";
import { useTheme } from "@/theme/hooks/use-theme";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();
  const backgroundColor = useTheme().background;

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking")
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
      </ThemedView>
    );

  if (status === "unauthenticated") return <Redirect href="/auth/login" />;

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor },
        contentStyle: { backgroundColor },
      }}
    >
      <Stack.Screen name="(home)/index" options={{ title: "Productos" }} />
    </Stack>
  );
};

export default CheckAuthenticationLayout;
