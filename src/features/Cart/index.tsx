import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "../../theme/ThemeProvider";
import CartHeader from "./components/CartHeader";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import CouponSection from "./components/CouponSection";
import CartActions from "./components/CartActions";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router";
import { appRoutes } from "../../routes";

const CartPage = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [discountPercent, setDiscountPercent] = useState(0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        px: { xs: 2, md: 7 },
        py: 6,
        bgcolor: theme.primary1,
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Breadcrumb */}
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{
          width: "100%",
          justifyContent: "flex-start",
          mt: 2,
          fontSize: 14,
          ml: isMobile ? 0 : 35,
        }}
      >
        <Link
          underline="hover"
          color={theme.Text1}
          onClick={() => navigate(appRoutes.home)}
          sx={{ cursor: "pointer", fontSize: 14 }}
        >
          Home
        </Link>
        <Typography color={theme.Text1} sx={{ fontSize: 14 }}>
          Cart
        </Typography>
      </Breadcrumbs>

      <Typography sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 600, mb: 4 }}>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 8,
            gap: 2,
          }}
        >
          <Typography
            sx={{ color: theme.Text1, fontSize: 20, fontWeight: 500 }}
          >
            Your cart is empty 🛒
          </Typography>
          <Typography
            sx={{ fontSize: 16, color: theme.Text1, textAlign: "center" }}
          >
            Browse our products and add items to your cart
          </Typography>
          <CartActions
            isMobile={isMobile}
            returnToShop={() => navigate(appRoutes.home)}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Header only on desktop */}
          {!isMobile && (
            <CartHeader gridCols="1.5fr 1fr 1fr 1.5fr" isMobile={isMobile} />
          )}

          {/* Cart Items */}
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              gridCols={isMobile ? "1fr" : "1.5fr 1fr 1fr 1.5fr"}
              onRemove={removeItem}
              onQtyChange={updateQuantity}
              theme={theme}
              isMobile={isMobile}
            />
          ))}

          {/* Action Buttons */}
          <CartActions
            isMobile={isMobile}
            returnToShop={() => navigate(appRoutes.home)}
          />

          {/* Coupon + Summary row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 2,
              width: "100%",
              mt: 5,
            }}
          >
            <CouponSection
              isMobile={isMobile}
              setDiscountPercent={setDiscountPercent}
            />

            <CartSummary
              subtotal={subtotal}
              discount={discountPercent}
              isMobile={isMobile}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
