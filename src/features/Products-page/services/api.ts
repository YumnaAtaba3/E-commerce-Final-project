import { httpClient } from "../../../lib/axios";
import type { Product } from "../../../store/state";


const BASE_URL = "/products";

const ProductServices = {
  getAll: async (offset = 0, limit = 50): Promise<Product[]> => {
    const res = await httpClient.get(`${BASE_URL}?offset=${offset}&limit=${limit}`);
    return res.data;
  },

  getById: async (id: number): Promise<Product> => {
    const res = await httpClient.get(`${BASE_URL}/${id}`);
    return res.data;
  },

  getBySlug: async (slug: string): Promise<Product> => {
    const res = await httpClient.get(`${BASE_URL}/slug/${slug}`);
    return res.data;
  },

  getRelatedById: async (id: number): Promise<Product[]> => {
    const res = await httpClient.get(`${BASE_URL}/${id}/related`);
    return res.data;
  },
};

export default ProductServices;

