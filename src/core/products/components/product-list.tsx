import { FlatList } from "react-native";
import { Product } from "../interfaces/product.interface";
import { ProductCard } from "./product-card";

interface Props {
  products: Product[];
  loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: Props) => (
  <FlatList
    data={products}
    numColumns={2}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <ProductCard product={item} />}
  />
);

export default ProductList;
