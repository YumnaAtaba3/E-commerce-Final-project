export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: Category;
  images: string[];
  slug?: string;

  // Frontend-only fields
  rating?: number;     // e.g., 0 - 5
  discount?: string;   // e.g., "-15%"
  isNew?: boolean;     // true if product is new
}

export const productInitState = {
  products: [] as Product[],
  filteredProducts: [] as Product[],
  selectedProduct: null as Product | null,
};
