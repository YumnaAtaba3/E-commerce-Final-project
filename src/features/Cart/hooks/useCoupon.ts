import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useCouponStore } from "../../../store/couponStore";

export const useCouponLogic = (setDiscountPercent: (discount: number) => void) => {
  const { couponCode: savedCoupon, discountPercent: savedDiscount, setCoupon } = useCouponStore();
  const [couponCode, setCouponCodeState] = useState(savedCoupon || "");
  const [isCouponApplied, setIsCouponApplied] = useState(!!savedCoupon);

  useEffect(() => {
    if (savedCoupon) {
      setDiscountPercent(savedDiscount);
    }
  }, [savedCoupon, savedDiscount, setDiscountPercent]);

  const handleApplyCoupon = () => {
    if (isCouponApplied) {
      toast.info("Coupon already applied!", { className: "toast-info" });
      return;
    }

    const code = couponCode.trim().toUpperCase();
    let discount = 0;

    switch (code) {
      case "SAVE10": discount = 10; break;
      case "SAVE20": discount = 20; break;
      case "SAVE30": discount = 30; break;
      case "SAVE50": discount = 50; break;
      default:
        toast.error("Invalid coupon code", { className: "toast-error" });
        setDiscountPercent(0);
        return;
    }

    setDiscountPercent(discount);
    setCoupon(code, discount); 
    setIsCouponApplied(true);
    toast.success(`Coupon applied! ${discount}% off`, { className: "toast-success" });
  };

  return {
    couponCode,
    setCouponCode: setCouponCodeState,
    isCouponApplied,
    handleApplyCoupon,
  };
};
