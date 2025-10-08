// src/pages/ProductsPage/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../../lib/axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating?: number;
  images: string[];
  category: { id: number; name: string; slug: string };
  isNew?: boolean;
}

// Optional enrichment (for demo)
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

/**
 * Fetch products with pagination and optional category filter.
 * `page` starts at 1
 */
export const useProductsQuery = (
  page: number = 1,
  limit: number = 10,
  categorySlug?: string
) => {
  const offset = (page - 1) * limit;

  return useQuery<Product[], Error>({
    queryKey: ["products", page, limit, categorySlug],
    queryFn: async () => {
      const params: any = { limit, offset };
      if (categorySlug) params.categorySlug = categorySlug;

      const res = await httpClient.get("/products", { params });
      return enrichProducts(res.data);
    },
    keepPreviousData: true,
  });
};
