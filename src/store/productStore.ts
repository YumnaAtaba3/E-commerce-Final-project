import { create } from "zustand";
import { productInitState, type Product } from "./state";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;

}

export const useProductsState = create<ProductState>((set) => ({
  ...productInitState,

  setProducts: (products) => set({ products, filteredProducts: products }),

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  
}));
