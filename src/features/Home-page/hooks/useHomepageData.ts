
import { useEffect, useCallback, useState } from "react";
import { useProductsQuery } from "../../Products-page/hooks/useProducts";
import { useProductsState } from "../../../store/productStore";
import type { Product } from "../../../store/state";

export function useHomepageData() {
  const { setProducts } = useProductsState();
  const [retryIndex, setRetryIndex] = useState(0);

  const { data: products, isLoading, isError } = useProductsQuery(0, 50, retryIndex);

  useEffect(() => {
    if (products) {
      setProducts(products as Product[]);
    }
  }, [products, setProducts]);


  const refetch = useCallback(() => {
    setRetryIndex(prev => prev + 1);
  }, []);

  return {
    products,
    isLoading,
    isError,
    refetch,
  };
}
