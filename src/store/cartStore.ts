import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./state";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1) => {
        const existing = get().cart.find((p) => p.id === product.id);

        if (existing) {
          set({
            cart: get().cart.map((p) =>
              p.id === product.id
                ? { ...p, quantity: p.quantity + quantity }
                : p
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...product, quantity }] });
        }
      },

      removeFromCart: (id) => {
        set({ cart: get().cart.filter((p) => p.id !== id) });
      },

      updateQuantity: (id, qty) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      isInCart: (id) => get().cart.some((p) => p.id === id),
    }),
    {
      name: "cart-storage", 
    }
  )
);
