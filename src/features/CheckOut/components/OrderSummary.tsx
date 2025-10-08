import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme as useCustomTheme } from "../../../theme/ThemeProvider";
import ProductItem from "./ProductItem";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useCartStore } from "../../../store/cartStore";
import MasterCard from "../../../assets/CheckOut/masterCard.svg";
import ChinaLogo from "../../../assets/CheckOut/chinalogo.svg";
import Bkash from "../../../assets/CheckOut/Bkash.svg";
import { useState } from "react";

interface OrderSummaryProps {
  onPlaceOrder: (paymentMethod: string) => void;
}

const OrderSummary = ({ onPlaceOrder }: OrderSummaryProps) => {
  const { theme } = useCustomTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const cart = useCartStore((state) => state.cart);

  // Calculate subtotal from cart items
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  const [selectedPayment, setSelectedPayment] = useState("bank");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        alignItems: "flex-start",
      }}
    >
      {/* Product Summary Box */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: theme.primary1,
          width: "100%",
          maxWidth: 400,
          maxHeight: 300,
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
              price={`$${product.price.toFixed(2)}`}
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
          p: 2,
          borderRadius: 2,
          bgcolor: theme.primary1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        {/* Totals */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 16 }}>Subtotal</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              ${subtotal.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 16 }}>Shipping</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </Typography>
          </Box>
          <Box
            sx={{
              borderTop: `1px solid ${theme.borderColor}`,
              width: "100%",
              my: 1,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
            }}
          >
            <Typography sx={{ fontSize: 16 }}>Total</Typography>
            <Typography sx={{ fontSize: 16 }}>${total.toFixed(2)}</Typography>
          </Box>
        </Box>

        {/* Payment Options */}
        <RadioGroup
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
                  gap: 2,
                }}
              >
                <Typography sx={{ fontSize: 16, flex: 1 }}>Bank</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    component="img"
                    src={MasterCard}
                    alt="MasterCard"
                    sx={{ height: 28 }}
                  />
                  <Box
                    component="img"
                    src={ChinaLogo}
                    alt="China"
                    sx={{ height: 28 }}
                  />
                  <Box
                    component="img"
                    src={Bkash}
                    alt="Bkash"
                    sx={{ height: 28 }}
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
              <Typography sx={{ fontSize: 16 }}>Cash on delivery</Typography>
            }
          />
        </RadioGroup>
      </Box>

      {/* Place Order Button */}
      <Button
        variant="contained"
        sx={{
          width: 190,
          height: 56,
          bgcolor: theme.Button2,
          color: "#fff",
          fontSize: "14px",
          fontWeight: 500,
          textTransform: "none",
          "&:hover": { bgcolor: theme.error },
          alignSelf: "flex-start",
        }}
        onClick={() => onPlaceOrder(selectedPayment)}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default OrderSummary;
