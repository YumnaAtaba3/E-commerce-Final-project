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
import { motion } from "framer-motion";

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

  // ---------- Animations ----------
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const headerVariants = {
    hidden: { y: -40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemLeftVariants = {
    hidden: { x: -80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const couponVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const summaryVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

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
        separator="/"
        aria-label="breadcrumb"
        sx={{
          color:theme.Text1,
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

      {cart.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 8,
            gap: 3,
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            width: "100%",
            maxWidth: 1200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          {/* Header */}
          {!isMobile && (
            <motion.div variants={headerVariants} style={{ width: "100%" }}>
              <CartHeader
                gridCols="1.5fr 1fr 1fr 1.5fr"
                isMobile={isMobile}
                theme={theme}
              />
            </motion.div>
          )}

          {/* Items */}
          {cart.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemLeftVariants}
              style={{ width: "100%" }}
            >
              <CartItem
                item={item}
                gridCols={isMobile ? "1fr" : "1.5fr 1fr 1fr 1.5fr"}
                onRemove={removeItem}
                onQtyChange={updateQuantity}
                theme={theme}
                isMobile={isMobile}
              />
            </motion.div>
          ))}

          {/* Buttons */}
          <CartActions
            isMobile={isMobile}
            returnToShop={() => navigate(appRoutes.home)}
          />

          {/* Coupon + Summary */}
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
            <motion.div
              variants={couponVariants}
              style={{ flex: 1, width: "100%" }}
            >
              <CouponSection
                isMobile={isMobile}
                setDiscountPercent={setDiscountPercent}
              />
            </motion.div>

            <motion.div
              variants={summaryVariants}
              style={{ flex: 1, width: "100%" }}
            >
              <CartSummary
                subtotal={subtotal}
                discount={discountPercent}
                isMobile={isMobile}
              />
            </motion.div>
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

export default CartPage;
