import { useQuery } from "@tanstack/react-query";
import ProductServices from "../services/api";
import type { Product } from "../../../store/state";

function enrichProducts(products: Product[]): Product[] {
  return products.map((p) => ({
    ...p,
    rating: Math.round(Math.random() * 5 * 10) / 10, // 0-5
    discount:
      Math.random() > 0.5
        ? `-${Math.floor(Math.random() * 30 + 5)}%`
        : undefined, // 5-35% chance
    isNew: Math.random() > 0.7, // 30% chance
  }));
}

// Fetch all products
export function useProductsQuery(offset = 0, limit = 50, retryIndex?: number) {
  return useQuery<Product[], Error>({
    queryKey: ["products", offset, limit],
    queryFn: async () => {
      const products = await ProductServices.getAll(offset, limit);
      return enrichProducts(products);
    },
  });
}

// Fetch single product by ID
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

// Fetch related products by ID
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

