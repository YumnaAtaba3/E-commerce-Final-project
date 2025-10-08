import { useEffect, useState, useCallback } from "react";
import { useProductsState } from "../../../store";
import { httpClient } from "../../../lib/axios";

interface FilterOptions {
  categoryId?: number;
  title?: string;
  priceMin?: number;
  priceMax?: number;
  limit?: number;
  offset?: number;
}

export function useFilter(options: FilterOptions = {}) {
  const { setProducts } = useProductsState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [retryIndex, setRetryIndex] = useState(0);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await httpClient.get("/products/", {
        params: {
          title: options.title,
          price_min: options.priceMin,
          price_max: options.priceMax,
          categoryId: options.categoryId,
          limit: options.limit || 20,
          offset: options.offset || 0,
        },
      });
      setProducts(res.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
      setIsLoading(false);
    }
  }, [options, setProducts, retryIndex]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = () => setRetryIndex((prev) => prev + 1);

  return { isLoading, isError, refetch };
}
