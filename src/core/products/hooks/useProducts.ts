import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../actions/get-products.action";

export const useProducts = () => {
  const productsQuery = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: ({ pageParam }) => getProducts(20, pageParam * 20),
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return { productsQuery, loadNextPage: productsQuery.fetchNextPage };
};
