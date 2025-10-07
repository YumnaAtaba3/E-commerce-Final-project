import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "../../theme/ThemeProvider";
import CartHeader from "./components/CartHeader";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import CouponSection from "./components/CouponSection";
import CartActions from "./components/CartActions";
import { useCartStore } from "../../store/cartStore";

const CartPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const { cart, removeFromCart, updateQuantity } = useCartStore();


  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);



  const gridCols = isMobile ? "1fr" : "minmax(300px,1fr) 150px 150px 150px";

  return (
    <Box sx={{ bgcolor: theme.primary1, py: { xs: 3, md: 6 } }}>
      <Container maxWidth="xl">
        <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 4 }}>
          Home /{" "}
          <span style={{ fontWeight: 600, color: theme.Text1 }}>Cart</span>
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid>
            {!isMobile && (
              <CartHeader gridCols={gridCols} isMobile={isMobile} />
            )}

            {cart.length === 0 ? (
              <Typography sx={{ mt: 5, color: theme.Text1 }}>
                Your cart is empty.
              </Typography>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  gridCols={gridCols}
                  onRemove={removeFromCart}
                  onQtyChange={updateQuantity}
                  theme={theme}
                  isMobile={isMobile}
                />
              ))
            )}

           

            <CartActions isMobile={isMobile} />
          </Grid>

          <CouponSection isMobile={isMobile} setDiscountPercent={setDiscount} />

          <Grid>
            <CartSummary
              subtotal={subtotal}
              discount={discount}
              isMobile={isMobile}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartPage;
