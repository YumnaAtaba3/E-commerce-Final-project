
import { create } from "zustand";

interface SearchState {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
}));
