import { create } from "zustand";
import { persist } from "zustand/middleware";
import type{ Product } from "./state";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  filterProducts: (keyword: string) => void;
}

const sampleProducts: Product[] = [
  { id: 1, title: "ASUS FHD Gaming Laptop", price: 960, oldPrice: "$1160", discount: "-35%", rating: 4.5, images: ["/laptop.png"], isNew: true },
  { id: 2, title: "IPS LCD Gaming Monitor", price: 1160, oldPrice: "", discount: "", rating: 4.5, images: ["/monitor.png"], isNew: true },
  { id: 3, title: "HAVIT HV-G92 Gamepad", price: 560, oldPrice: "", discount: "", rating: 4, images: ["/red-gamepad.png"] },
  { id: 4, title: "AK-900 Wired Keyboard", price: 200, oldPrice: "", discount: "", rating: 4.5, images: ["/keyboard.png"] },
  { id: 5, title: "Gaming Headset X", price: 120, oldPrice: "$150", discount: "-20%", rating: 4.2, images: ["/headset.png"], isNew: true },
  { id: 6, title: "RGB Mouse", price: 80, oldPrice: "$100", discount: "-20%", rating: 4, images: ["/mouse.png"] },
];

export const useProductsState = create<ProductState>()(
  persist(
    (set, get) => ({
      products: sampleProducts,
      filteredProducts: sampleProducts,
      selectedProduct: null,
      setProducts: (products) => set({ products, filteredProducts: products }),
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      filterProducts: (keyword) => {
        const { products } = get();
        const filtered = products.filter(
          (p) =>
            p.title.toLowerCase().includes(keyword.toLowerCase()) ||
            p.category?.name.toLowerCase().includes(keyword.toLowerCase())
        );
        set({ filteredProducts: filtered });
      },
    }),
    {
      name: "products-storage", // localStorage key to persist products
    }
  )
);
