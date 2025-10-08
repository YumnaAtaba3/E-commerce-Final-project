export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: Category;
  images: string[];
  slug?: string;
  img?: string;
  quantity?: number;

  // Frontend-only fields
  oldPrice?: number | string;
  discount?: string;
  colors?: string[];
  rating?: number;
  isNew?: boolean;
}

export const productInitState = {
  products: [] as Product[],
  filteredProducts: [] as Product[],
  selectedProduct: null as Product | null,
};
