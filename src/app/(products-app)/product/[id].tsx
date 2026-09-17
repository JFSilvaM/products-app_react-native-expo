import { Icons } from "@/constants/theme";
import ProductImages from "@/core/products/components/product-images";
import { useProduct } from "@/core/products/hooks/useProduct";
import { Size } from "@/core/products/interfaces/product.interface";
import { useCameraStore } from "@/store/useCameraStore";
import MenuIconButton from "@/theme/components/menu-icon-button";
import ThemedButton from "@/theme/components/themed-button";
import ThemedButtonGroup from "@/theme/components/themed-button-group";
import ThemedTextInput from "@/theme/components/themed-text-input";
import { ThemedView } from "@/theme/components/themed-view";
import {
  Redirect,
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Formik } from "formik";
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
  const { productQuery, productMutation } = useProduct(`${id}`);
  const { selectedImages, clearImages } = useCameraStore();

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const product = productQuery.data!;

  useEffect(() => {
    return () => clearImages();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          icon={Icons.camera}
          onPress={() => router.push("../../camera")}
        />
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
    <Formik
      initialValues={product}
      onSubmit={(productLike) => productMutation.mutate(productLike)}
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={{
              paddingBottom: isKeyboardVisible ? 70 : 0,
            }}
            showsVerticalScrollIndicator={false}
          >
            <ProductImages images={[...product.images, ...selectedImages]} />

            <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
              <ThemedTextInput
                placeholder="Título"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange("title")}
              />

              <ThemedTextInput
                placeholder="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange("slug")}
              />

              <ThemedTextInput
                placeholder="Descripción"
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                value={values.description}
                onChangeText={handleChange("description")}
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
              <ThemedTextInput
                placeholder="Precio"
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange("price")}
              />

              <ThemedTextInput
                placeholder="Inventario"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange("stock")}
              />
            </ThemedView>

            <ThemedView style={{ marginHorizontal: 10 }}>
              <ThemedButtonGroup
                options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                selectedOptions={values.sizes}
                onSelect={(selectedOption) => {
                  const newSizesValue = values.sizes.includes(
                    selectedOption as Size,
                  )
                    ? values.sizes.filter((v) => v !== selectedOption)
                    : [...values.sizes, selectedOption];

                  setFieldValue("sizes", newSizesValue);
                }}
              />

              <ThemedButtonGroup
                options={["kid", "men", "women", "unisex"]}
                selectedOptions={[values.gender]}
                onSelect={(selectedOption) =>
                  setFieldValue("gender", selectedOption)
                }
              />
            </ThemedView>

            <View
              style={{ marginHorizontal: 10, marginBottom: 50, marginTop: 20 }}
            >
              <ThemedButton icon={Icons.save} onPress={() => handleSubmit()}>
                Guardar
              </ThemedButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ProductScreen;
