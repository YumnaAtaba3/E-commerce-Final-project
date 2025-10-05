import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";
import Breadcrumb from "./components/Breadcrumb";
import BillingForm from "./components/BillingForm";
import OrderSummary from "./components/OrderSummary";

const Checkout = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
       
        width:"100%",
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 6,
        fontFamily: "'Inter', sans-serif",
        color: theme.Text1,
        bgcolor: theme.primary1,
        transition: "all 0.3s ease-in-out", 
      }}
    >
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Heading */}
      <Typography
        sx={{
          fontSize: { xs: "24px", md: "32px" },
          fontWeight: 500,
          mb: 4,
          color: theme.Text1,
          transition: "all 0.3s ease-in-out",
        }}
      >
        Billing Details
      </Typography>

      {/* Layout */}
      <Grid
        container
        spacing={{ xs: 6, md: 16 }}
        sx={{
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Left column - Billing form */}
        <Grid item xs={12} md={6}>
          <BillingForm />
        </Grid>

        {/* Right column - Order summary */}
        <Grid item xs={12} md={6}>
          <OrderSummary />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
