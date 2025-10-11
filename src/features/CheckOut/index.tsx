import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";
import Breadcrumb from "./components/Breadcrumb";
import BillingForm, { type BillingFormRef } from "./components/BillingForm";
import OrderSummary from "./components/OrderSummary";
import InvoicePopup from "./components/InvoicePopup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { appRoutes } from "../../routes";
import { useCartStore } from "../../store/cartStore";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const Checkout = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);
  const formRef = useRef<BillingFormRef>(null);

  const [invoicePopupOpen, setInvoicePopupOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  const handlePlaceOrder = async (paymentMethod: string) => {
    const billingData = await formRef.current?.submitForm();
    if (!billingData) {
      toast.error("Please fill all required fields correctly!", {
        className: "toast-error",
        autoClose: 2000,
      });
      return;
    }

    const cartItems = useCartStore.getState().cart;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const shipping = subtotal > 0 ? 20 : 0;
    const total = subtotal + shipping;

    const invoice = {
      billingData,
      cartItems,
      subtotal,
      shipping,
      total,
      paymentMethod,
      date: new Date().toISOString(),
    };

    setInvoiceData(invoice);
    setInvoicePopupOpen(true);

    toast.success("Order placed successfully!", {
      className: "toast-success",
      autoClose: 2000,
    });

    clearCart();
  };

  // Animation variants
  const billingVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const summaryVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 } },
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 4 },
        py: 6,
        fontFamily: "'Inter', sans-serif",
        color: theme.Text1,
        bgcolor: theme.primary1,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "auto", pl: { xs: 1, md: 6 } }}>
        <Breadcrumb />

        <Typography
          sx={{
            fontSize: { xs: "24px", md: "32px" },
            fontWeight: 500,
            mb: 4,
            color: theme.Text1,
            textAlign: "start",
            pl: { xs: 1, md: 8 },
          }}
        >
          Billing Details
        </Typography>

        <Grid container spacing={{ xs: 6, md: 15 }} justifyContent="start">
          <Grid item xs={12} md={7}>
            <motion.div
              variants={billingVariant}
              initial="hidden"
              animate="visible"
            >
              <BillingForm ref={formRef} />
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div
              variants={summaryVariant}
              initial="hidden"
              animate="visible"
            >
              <OrderSummary onPlaceOrder={handlePlaceOrder} />
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Invoice Popup */}
      <InvoicePopup
        open={invoicePopupOpen}
        onClose={() => {
          setInvoicePopupOpen(false);
          navigate(appRoutes.home);
        }}
        invoice={invoiceData}
      />
    </Box>
  );
};

export default Checkout;
