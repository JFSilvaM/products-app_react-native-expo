import ThemedButton from "@/theme/components/themed-button";
import ThemedLink from "@/theme/components/themed-link";
import { ThemedText } from "@/theme/components/themed-text";
import ThemedTextInput from "@/theme/components/themed-text-input";
import { Icon } from "@expo/ui";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const MAIL_ICON = Icon.select({
  ios: "mail.fill",
  android: import("@expo/material-symbols/mail.xml"),
});

const LOCK_CLOSED_ICON = Icon.select({
  ios: "lock.fill",
  android: import("@expo/material-symbols/lock.xml"),
});

const ARROW_FORWARD_ICON = Icon.select({
  ios: "arrow.forward",
  android: import("@expo/material-symbols/arrow_forward.xml"),
});

const LoginScreen = () => {
  const { height } = useWindowDimensions();

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 40 }}>
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
            icon={MAIL_ICON}
          />

          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon={LOCK_CLOSED_ICON}
          />
        </View>

        <ThemedButton icon={ARROW_FORWARD_ICON} style={{ marginVertical: 10 }}>
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
