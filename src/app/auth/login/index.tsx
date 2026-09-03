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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
