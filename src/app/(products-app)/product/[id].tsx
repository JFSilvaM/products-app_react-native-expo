import { Icons } from "@/constants/theme";
import ProductImages from "@/core/products/components/product-images";
import { useProduct } from "@/core/products/hooks/useProduct";
import ThemedButton from "@/theme/components/themed-button";
import ThemedButtonGroup from "@/theme/components/themed-button-group";
import ThemedTextInput from "@/theme/components/themed-text-input";
import { ThemedView } from "@/theme/components/themed-view";
import { Host, Icon } from "@expo/ui";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const ProductScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { productQuery } = useProduct(`${id}`);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const product = productQuery.data!;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Host matchContents>
          <Icon name={Icons.camera} size={24} />
        </Host>
      ),
    });
  }, []);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true),
    );
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(false),
    );

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  if (productQuery.isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );

  if (!productQuery.data) return <Redirect href="/(products-app)/(home)" />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: isKeyboardVisible ? 70 : 0 }}
        showsVerticalScrollIndicator={false}
      >
        <ProductImages images={product.images} />

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

        <ThemedView style={{ marginHorizontal: 10 }}>
          <ThemedButtonGroup
            options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
            selectedOptions={product.sizes}
            onSelect={(option) => console.log({ option })}
          />

          <ThemedButtonGroup
            options={["kid", "men", "women", "unisex"]}
            selectedOptions={[product.gender]}
            onSelect={(option) => console.log({ option })}
          />
        </ThemedView>

        <View style={{ marginHorizontal: 10, marginBottom: 50, marginTop: 20 }}>
          <ThemedButton
            icon={Icons.save}
            onPress={() => console.log("Guardar")}
          >
            Guardar
          </ThemedButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;
