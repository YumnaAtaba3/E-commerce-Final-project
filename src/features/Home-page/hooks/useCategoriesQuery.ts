// src/features/Category-page/hooks/useCategoriesQuery.ts
import { useQuery } from "@tanstack/react-query";
import CategoryServices, { type Category } from "../services/api";

// Get all categories
export function useCategoriesQuery() {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: CategoryServices.getAll,
  });
}

// Get single category by slug
export function useCategoryBySlugQuery(slug: string | undefined) {
  return useQuery<Category, Error>({
    queryKey: ["category", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Category slug is required");
      return await CategoryServices.getBySlug(slug);
    },
    enabled: !!slug,
  });
}
