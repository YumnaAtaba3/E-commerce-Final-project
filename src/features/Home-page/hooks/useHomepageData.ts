// src/pages/home/hooks/useHomepageData.ts
import { useEffect } from "react";
import { useProductsQuery } from "../../Products-page/hooks/useProducts";
import { useProductsState } from "../../../store";

export function useHomepageData() {
  const { data: products, isLoading, isError } = useProductsQuery(0, 50);
  const { setProducts } = useProductsState();

  // When products are loaded, save them in Zustand
  useEffect(() => {
    if (products) {
      setProducts(products);
    }
  }, [products, setProducts]);

  return {
    products,
    isLoading,
    isError,
  };
}
