// store/cartStore.ts
import { create } from "zustand";
import type { Product } from "./state";
import { dataStorage } from "../lib/storage";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  getTotalPrice: () => number;
}

const cartStorage = dataStorage<CartItem[]>("cart");

export const useCartStore = create<CartState>((set, get) => ({
  cart: cartStorage.get() || [],

  // ✅ Add product to cart
  addToCart: (product, quantity = 1) => {
    const existing = get().cart.find((item) => item.id === product.id);

    let newCart: CartItem[];
    if (existing) {
      newCart = get().cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [
        ...get().cart,
        { ...product, quantity, images: product.images || [] },
      ];
    }

    set({ cart: newCart });
    cartStorage.set(newCart);
  },

  // ✅ Remove product from cart
  removeFromCart: (id) => {
    const newCart = get().cart.filter((item) => item.id !== id);
    set({ cart: newCart });
    cartStorage.set(newCart);
  },

  // ✅ Update item quantity
  updateQuantity: (id, quantity) => {
    const newCart = get().cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    set({ cart: newCart });
    cartStorage.set(newCart);
  },

  // ✅ Clear cart completely
  clearCart: () => {
    set({ cart: [] });
    cartStorage.remove();
  },

  // ✅ Check if item is in cart
  isInCart: (id) => get().cart.some((item) => item.id === id),

  // ✅ Calculate total price
  getTotalPrice: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
}));
