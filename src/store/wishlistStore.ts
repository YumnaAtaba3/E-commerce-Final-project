// store/wishlistStore.ts
import { create } from "zustand";
import type { Product } from "./state";
import { dataStorage } from "../lib/storage";

interface WishlistState {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  isInWishlist: (id: number) => boolean;
}

const wishlistStorage = dataStorage<Product[]>("wishlist");

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: wishlistStorage.get() || [],

  addToWishlist: (product) => {
    const exists = get().wishlist.find((p) => p.id === product.id);
    if (!exists) {
      const newWishlist = [...get().wishlist, product];
      set({ wishlist: newWishlist });
      wishlistStorage.set(newWishlist);
    }
  },

  removeFromWishlist: (id) => {
    const newWishlist = get().wishlist.filter((p) => p.id !== id);
    set({ wishlist: newWishlist });
    wishlistStorage.set(newWishlist);
  },

  clearWishlist: () => {
    set({ wishlist: [] });
    wishlistStorage.remove();
  },

  isInWishlist: (id) => get().wishlist.some((p) => p.id === id),
}));
