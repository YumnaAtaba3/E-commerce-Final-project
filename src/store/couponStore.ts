import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CouponState {
  couponCode: string;
  discountPercent: number;
  setCoupon: (code: string, discount: number) => void;
  clearCoupon: () => void;
}

export const useCouponStore = create<CouponState>()(
  persist(
    (set) => ({
      couponCode: "",
      discountPercent: 0,
      setCoupon: (code, discount) => set({ couponCode: code, discountPercent: discount }),
      clearCoupon: () => set({ couponCode: "", discountPercent: 0 }),
    }),
    {
      name: "coupon-storage",
    }
  )
);
