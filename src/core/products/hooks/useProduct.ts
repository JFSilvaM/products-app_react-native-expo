import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";
import { createUpdateProduct } from "../actions/create-update-product.action";
import { getProductById } from "../actions/get-product-by-id.action";
import { Product } from "../interfaces/product.interface";

export const useProduct = (productId: string) => {
  const productQuery = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const productMutation = useMutation({
    mutationFn: (data: Product) => createUpdateProduct(data),

    onSuccess(data: Product) {
      Alert.alert(
        "Producto guardado",
        `${data.title} ha sido guardado correctamente.`,
      );
    },
  });

  return { productQuery, productMutation };
};
