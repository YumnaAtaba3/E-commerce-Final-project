/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { httpClient } from "../../../lib/axios";
import ProductServices from "../services/api";
import type { Product } from "../../../store/state";

function enrichProducts(products: Product[]): Product[] {
  return products.map((p) => ({
    ...p,
    rating: Math.round(Math.random() * 5 * 10) / 10,
    discount:
      Math.random() > 0.5
        ? `-${Math.floor(Math.random() * 30 + 5)}%`
        : undefined,
    isNew: Math.random() > 0.7,
  }));
}

export function useProductByIdQuery(id: number | undefined) {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is required");
      const product = await ProductServices.getById(id);
      return enrichProducts([product])[0];
    },
    enabled: !!id,
  });
}

export function useRelatedProductsQuery(id: number | undefined, limit = 4) {
  return useQuery<Product[], Error>({
    queryKey: ["relatedProducts", id, limit],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is required");
      const all = await ProductServices.getAll();
      const related = all.filter((p) => p.id !== id).slice(0, limit);
      return enrichProducts(related);
    },
    enabled: !!id,
  });
}

export const useProductsQuery = (
  page: number = 1,
  limit: number = 10,
  categorySlug?: string,
  retryIndex?: number
) => {
  const offset = (page - 1) * limit;

  return useQuery<Product[], Error>({
    queryKey: ["products", page, limit, categorySlug, retryIndex], 
    queryFn: async () => {
      const params: any = { limit, offset };
      if (categorySlug) params.categorySlug = categorySlug;

      const res = await httpClient.get("/products", { params });
      return enrichProducts(res.data);
    },
    placeholderData: keepPreviousData,
  });
};

