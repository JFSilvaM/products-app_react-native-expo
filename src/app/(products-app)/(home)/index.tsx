import ProductList from "@/core/products/components/product-list";
import { useProducts } from "@/core/products/hooks/useProducts";
import { ActivityIndicator, View } from "react-native";

const HomeScreen = () => {
  const { productsQuery, loadNextPage } = useProducts();

  return productsQuery.isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={30} />
    </View>
  ) : (
    <View style={{ paddingHorizontal: 10 }}>
      <ProductList
        products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
        loadNextPage={loadNextPage}
      />
    </View>
  );
};

export default HomeScreen;
