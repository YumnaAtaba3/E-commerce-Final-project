import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
} from "@mui/material";
import { useTheme as useCustomTheme } from "../../../theme/ThemeProvider";
import ProductItem from "./ProductItem";
import CouponSection from "../../Cart/components/CouponSection";
import { useCartStore } from "../../../store/cartStore";
import { useCouponStore } from "../../../store/couponStore";
import MasterCard from "../../../assets/CheckOut/masterCard.svg";
import ChinaLogo from "../../../assets/CheckOut/chinalogo.svg";
import Bkash from "../../../assets/CheckOut/Bkash.svg";
import visaLogo from "../../../assets/CheckOut/Visa.svg";
import { useState } from "react";

interface OrderSummaryProps {
  onPlaceOrder: (paymentMethod: string) => void;
}

const OrderSummary = ({ onPlaceOrder }: OrderSummaryProps) => {
  const { theme } = useCustomTheme();
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearCoupon = useCouponStore((state) => state.clearCoupon);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  const [selectedPayment, setSelectedPayment] = useState("bank");
  const [discountPercent, setDiscountPercent] = useState(0);
  const discountedTotal = total - (total * discountPercent) / 100;

  const handlePlaceOrder = (paymentMethod: string) => {
    onPlaceOrder(paymentMethod);

    // Clear cart and coupon after placing the order
    clearCart();
    clearCoupon();
    setDiscountPercent(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3.5,
        width: "100%",
        
        alignItems: "flex-start",
      }}
    >
      {/* Product Summary Box */}
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          bgcolor: theme.primary1,
          width: "100%",
          maxWidth: 400,
          maxHeight: 200,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.Button2,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
        }}
      >
        {cart.length > 0 ? (
          cart.map((product) => (
            <ProductItem
              key={product.id}
              name={product.title}
              price={`$${(product.price * (product.quantity || 1)).toFixed(2)}`}
              image={product.images?.[0] || "/placeholder.png"}
            />
          ))
        ) : (
          <Typography sx={{ fontSize: 16, color: theme.Text1 }}>
            Your cart is empty 🛒
          </Typography>
        )}
      </Box>

      {/* Totals and Payment */}
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          bgcolor: theme.primary1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          width: "100%",
          maxWidth: 400,
        }}
      >
        {/* Totals */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 15 }}>Subtotal</Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
              ${subtotal.toFixed(2)}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: theme.borderColor, my: 0.5 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 15 }}>Shipping</Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: theme.borderColor, my: 0.5 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              mt: 1,
            }}
          >
            <Typography sx={{ fontSize: 15 }}>Total</Typography>
            <Typography sx={{ fontSize: 15 }}>
              ${discountedTotal.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Payment Options */}
        <RadioGroup
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1.5 }}
        >
          <FormControlLabel
            value="bank"
            control={
              <Radio
                sx={{
                  color: theme.Text1,
                  "&.Mui-checked": { color: theme.Text1 },
                }}
              />
            }
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 20,
                }}
              >
                <Typography sx={{ fontSize: 15, flex: 1 }}>Bank</Typography>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <Box
                    component="img"
                    src={Bkash}
                    alt="Bkash"
                    sx={{ height: 22 }}
                  />
                  <Box
                    component="img"
                    src={visaLogo}
                    alt="Visa"
                    sx={{ height: 22 }}
                  />
                  <Box
                    component="img"
                    src={ChinaLogo}
                    alt="China"
                    sx={{ height: 22 }}
                  />
                  <Box
                    component="img"
                    src={MasterCard}
                    alt="MasterCard"
                    sx={{ height: 22 }}
                  />
                </Box>
              </Box>
            }
          />

          <FormControlLabel
            value="cod"
            control={
              <Radio
                sx={{
                  color: theme.Text1,
                  "&.Mui-checked": { color: theme.Text1 },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: 15 }}>Cash on delivery</Typography>
            }
          />
        </RadioGroup>
      </Box>

      {/* Coupon Section */}
      <CouponSection isMobile={false} setDiscountPercent={setDiscountPercent} />

      {/* Place Order Button */}
      <Button
        variant="contained"
        sx={{
          width: 190,
          height: 48,
          bgcolor: theme.Button2,
          color: "#fff",
          fontSize: "14px",
          fontWeight: 500,
          textTransform: "none",
          "&:hover": { bgcolor: theme.error },
          alignSelf: "flex-start",
        }}
        onClick={() => handlePlaceOrder(selectedPayment)}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default OrderSummary;
