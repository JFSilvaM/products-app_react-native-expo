import { useCameraStore } from "@/store/useCameraStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";
import { createUpdateProduct } from "../actions/create-update-product.action";
import { getProductById } from "../actions/get-product-by-id.action";
import { Product } from "../interfaces/product.interface";

export const useProduct = (productId: string) => {
  const { clearImages } = useCameraStore();
  const queryClient = useQueryClient();
  const productIdRef = useRef(productId);

  const productQuery = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const productMutation = useMutation({
    mutationFn: (data: Product) =>
      createUpdateProduct({
        ...data,
        id: productIdRef.current,
      }),

    onSuccess(data: Product) {
      productIdRef.current = data.id;

      clearImages();

      queryClient.invalidateQueries({ queryKey: ["products", "infinite"] });
      queryClient.invalidateQueries({ queryKey: ["products", data.id] });

      Alert.alert(
        "Producto guardado",
        `${data.title} ha sido guardado correctamente.`,
      );
    },
  });

  return { productQuery, productMutation };
};
