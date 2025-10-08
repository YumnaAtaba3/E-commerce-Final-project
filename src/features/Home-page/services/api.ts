/* eslint-disable @typescript-eslint/no-explicit-any */
// src/modules/categories/services/api.ts
import { httpClient } from "../../../lib/axios";

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

const BASE_URL = "/categories";

const CategoryServices = {
  // ✅ Get all categories
  getAll: async (): Promise<Category[]> => {
    const res = await httpClient.get(BASE_URL);
    return res.data;
  },

  // ✅ Get category by ID
  getById: async (id: number): Promise<Category> => {
    const res = await httpClient.get(`${BASE_URL}/${id}`);
    return res.data;
  },

  // ✅ Get category by slug
  getBySlug: async (slug: string): Promise<Category> => {
    const res = await httpClient.get(`${BASE_URL}/slug/${slug}`);
    return res.data;
  },

  // ✅ Get products by category ID (with pagination)
  getProductsByCategoryId: async (
    id: number,
    offset = 0,
    limit = 20
  ): Promise<any[]> => {
    const res = await httpClient.get(`${BASE_URL}/${id}/products?offset=${offset}&limit=${limit}`);
    return res.data;
  },


};

export default CategoryServices;
