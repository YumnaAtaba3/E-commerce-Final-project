import { create } from "zustand";
import { productInitState, type Product } from "./state";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  filterProducts: (keyword: string) => void;
}

export const useProductsState = create<ProductState>((set, get) => ({
  ...productInitState,
  setProducts: (products) => set({ products, filteredProducts: products }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  filterProducts: (keyword: string) => {
    const { products } = get();
    const filtered = products.filter(
      (p) =>
        p.title.toLowerCase().includes(keyword.toLowerCase()) ||
        p.category?.name.toLowerCase().includes(keyword.toLowerCase())
    );
    set({ filteredProducts: filtered });
  },
}));
