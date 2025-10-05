import React, { useState } from "react";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "../../theme/ThemeProvider";
import CartHeader from "./components/CartHeader";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import CouponSection from "./components/CouponSection";
import CartActions from "./components/CartActions";
import Frame876 from "../../assets/About/Frame 876.png";

const initialItems = [
  { id: 1, name: "LCD Monitor", price: 650, quantity: 1, image: Frame876 },
  {
    id: 2,
    name: "H1 Gamepad",
    price: 550,
    quantity: 2,
    image: "/images/gamepad.png",
  },
];

const CartPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [items, setItems] = useState(initialItems);

  const handleRemove = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id));
  const handleQty = (id: number, q: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: q } : i))
    );

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const gridCols = isMobile ? "1fr" : "minmax(300px,1fr) 150px 150px 150px";

  return (
    <Box sx={{ bgcolor: theme.primary1, py: { xs: 3, md: 6 } }}>
      <Container maxWidth="xl">
        <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 4 }}>
          Home / <span style={{ fontWeight: 600, color: theme.Text1 }}>Cart</span>
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid >
            {!isMobile && (
              <CartHeader gridCols={gridCols} isMobile={isMobile} />
            )}

            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                gridCols={gridCols}
                onRemove={handleRemove}
                onQtyChange={handleQty}
                theme={theme}
                isMobile={isMobile}
              />
            ))}

            <CartActions isMobile={isMobile} />
          </Grid>
          <CouponSection isMobile={isMobile} />

          <Grid >
            <CartSummary subtotal={subtotal} isMobile={isMobile} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartPage;
