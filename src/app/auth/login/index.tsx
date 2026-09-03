import { useAuthStore } from "@/auth/store/use-auth-store";
import { Icons } from "@/constants/theme";
import ThemedButton from "@/theme/components/themed-button";
import ThemedLink from "@/theme/components/themed-link";
import { ThemedText } from "@/theme/components/themed-text";
import ThemedTextInput from "@/theme/components/themed-text-input";
import { useTheme } from "@/theme/hooks/use-theme";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const LoginScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useTheme().background;
  const { login } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    const { email, password } = form;

    if (email.length === 0 || password.length === 0) return;

    setIsPosting(true);
    const wasSuccessful = await login(email, password);
    setIsPosting(false);

    if (wasSuccessful) {
      router.replace("/");
      return;
    }

    Alert.alert("Error", "Correo electrónico o contraseña incorrectos");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 40, backgroundColor }}>
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Ingresar</ThemedText>

          <ThemedText style={{ color: "grey" }}>
            Por favor, ingrese para continuar
          </ThemedText>
        </View>

        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon={Icons.mail}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon={Icons.lockClosed}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>

        <ThemedButton
          icon={Icons.arrowForward}
          style={{ marginVertical: 10 }}
          onPress={onLogin}
          disabled={isPosting}
        >
          Ingresar
        </ThemedButton>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText>¿No tienes cuenta?</ThemedText>

          <ThemedLink href="/auth/register" style={{ marginHorizontal: 5 }}>
            Crear cuenta
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
