import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";
import Breadcrumb from "./components/Breadcrumb";
import BillingForm, { type BillingFormRef } from "./components/BillingForm";
import OrderSummary from "./components/OrderSummary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { appRoutes } from "../../routes";
import { useCartStore } from "../../store/cartStore";
import { useRef } from "react";

const Checkout = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);
  const formRef = useRef<BillingFormRef>(null);

  const handlePlaceOrder = async () => {
    const data = await formRef.current?.submitForm();

    if (!data) {
      toast.error("Please fill all required fields correctly!", {
        className: "toast-error",
        autoClose: 2000,
      });
      return;
    }

    toast.success("Order placed successfully!", {
      className: "toast-success",
      autoClose: 1500,
    });

    clearCart();
    setTimeout(() => navigate(appRoutes.home), 1500);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh", // full viewport height
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // horizontal center
        justifyContent: "center", // vertical center
        px: { xs: 2, md: 4 },
        py: 6,
        fontFamily: "'Inter', sans-serif",
        color: theme.Text1,
        bgcolor: theme.primary1,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        <Breadcrumb />

        <Typography
          sx={{
            fontSize: { xs: "24px", md: "32px" },
            fontWeight: 500,
            mb: 4,
            color: theme.Text1,
            textAlign: "start", // center the title
          }}
        >
          Billing Details
        </Typography>

        <Grid
          container
          spacing={{ xs: 6, md: 35 }}
          justifyContent="start" // centers the grid horizontally
        >
          <Grid item xs={12} md={7}>
            <BillingForm ref={formRef} />
          </Grid>

          <Grid item xs={12} md={5}>
            <OrderSummary onPlaceOrder={handlePlaceOrder} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Checkout;
