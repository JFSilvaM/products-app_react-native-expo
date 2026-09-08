import { Icons } from "@/constants/theme";
import ThemedTextInput from "@/theme/components/themed-text-input";
import { ThemedView } from "@/theme/components/themed-view";
import { Host, Icon } from "@expo/ui";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const ProductScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Host matchContents>
          <Icon name={Icons.camera} size={24} />
        </Host>
      ),
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
          <ThemedTextInput placeholder="Título" style={{ marginVertical: 5 }} />

          <ThemedTextInput placeholder="Slug" style={{ marginVertical: 5 }} />

          <ThemedTextInput
            placeholder="Descripción"
            multiline
            numberOfLines={5}
            style={{ marginVertical: 5 }}
          />
        </ThemedView>

        <ThemedView
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <ThemedTextInput placeholder="Precio" style={{ flex: 1 }} />

          <ThemedTextInput placeholder="Inventario" style={{ flex: 1 }} />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;
