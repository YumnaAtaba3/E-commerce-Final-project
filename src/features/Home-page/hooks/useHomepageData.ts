// src/pages/home/hooks/useHomepageData.ts
import { useEffect, useCallback, useState } from "react";
import { useProductsQuery } from "../../Products-page/hooks/useProducts";
import { useProductsState } from "../../../store";

export function useHomepageData() {
  const { setProducts } = useProductsState();
  const [retryIndex, setRetryIndex] = useState(0);

  // Fetch products with retry support
  const { data: products, isLoading, isError } = useProductsQuery(0, 50, retryIndex);

  // Save products in Zustand when loaded
  useEffect(() => {
    if (products) {
      setProducts(products);
    }
  }, [products, setProducts]);

  // Function to trigger a retry
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
