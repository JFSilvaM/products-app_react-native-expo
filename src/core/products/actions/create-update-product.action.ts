import { productsApi } from "@/core/api/products-api";
import { Product } from "../interfaces/product.interface";

export const createUpdateProduct = (product: Partial<Product>) => {
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);

  if (product.id && product.id !== "new") return updateProduct(product);

  return createProduct(product);
};

const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...rest } = product;

  try {
    const { data } = await productsApi.patch<Product>(`/products/${id}`, {
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error("Error al actualizar el producto");
  }
};

const createProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...rest } = product;

  try {
    const { data } = await productsApi.post<Product>("/products", {
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
};
