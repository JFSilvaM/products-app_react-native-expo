import { useAuthStore } from "@/auth/store/use-auth-store";
import { ThemedView } from "@/theme/components/themed-view";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();

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
    <Stack>
      <Stack.Screen name="(home)/index" options={{ title: "Productos" }} />
    </Stack>
  );
};

export default CheckAuthenticationLayout;
