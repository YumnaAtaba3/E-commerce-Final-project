
import React from "react";
import { Box, Button, CircularProgress, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";

import FilterSidebar from "./components/FilterSidebar";
import HeroSwiper from "./components/HeroSwiper";
import FlashSales from "./components/FlashSales";
import Categories from "./components/Categories";
import BestSelling from "./components/BestSelling";
import PromoBanner from "./components/PromoBanner";
import ExploreProducts from "./components/ExploreProducts";
import NewArrival from "./components/NewArrival";
import FeatureCard from "../../shared/components/Feature-card";

import IconDelivery from "../../assets/About/icon-delivery.svg";
import IconCustomer from "../../assets/About/Icon-Customerservice.svg";
import IconSecure from "../../assets/About/Icon-secure.svg";

import { useHomepageData } from "./hooks/useHomepageData";
import { motion } from "framer-motion";

const Homepage: React.FC = () => {
  const { theme } = useTheme();
  const { isLoading, isError, refetch } = useHomepageData();

   if (isLoading) {
     return (
       <Box
         sx={{
           height: "80vh",
           display: "flex",
           flexDirection: "column",
           justifyContent: "center",
           alignItems: "center",
           bgcolor: theme.primary1,
           color: theme.Text1,
         }}
       >
         <CircularProgress size={60} sx={{ color: theme.Button2, mb: 3 }} />
         <Typography variant="h6" sx={{ mb: 1 }}>
           Loading products...
         </Typography>
         <Typography
           variant="body2"
           sx={{ maxWidth: 300, textAlign: "center", color: theme.Text2 }}
         >
           Please wait a moment while we fetch the latest products for you.
         </Typography>
       </Box>
     );
   }

   if (isError) {
     return (
       <Box
         sx={{
           height: "80vh",
           display: "flex",
           flexDirection: "column",
           justifyContent: "center",
           alignItems: "center",
           bgcolor: theme.primary1,
           color: theme.Text1,
           px: 2,
         }}
       >
         <Typography variant="h5" sx={{ mb: 2, color: theme.Button2 }}>
           Oops! Something went wrong.
         </Typography>
         <Typography
           variant="body1"
           sx={{
             mb: 3,
             textAlign: "center",
             maxWidth: 350,
             color: theme.Text2,
           }}
         >
           We couldn’t load the products at this time. Please check your
           connection or try again.
         </Typography>
         <Button
           variant="contained"
           onClick={refetch}
           sx={{
             bgcolor: theme.Button2,
             color: theme.Text1,
             "&:hover": { bgcolor: theme.Button1 },
           }}
         >
           Retry
         </Button>
       </Box>
     );
   }

  return (
    <Stack sx={{ bgcolor: theme.primary1 }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Grid container spacing={2} sx={{ mt: 4, alignItems: "flex-start" }}>
          <Grid>
            <FilterSidebar />
          </Grid>

          <Grid>
            <HeroSwiper />
          </Grid>
        </Grid>

        {/* Product Sections */}
        <FlashSales />
        <Divider
          sx={{
            my: 6,
            borderColor: theme.Text2,
            opacity: 0.2,
            width: "80%",
            mx: "auto",
          }}
        />

        <Categories />
        <Divider
          sx={{
            my: 6,
            borderColor: theme.Text2,
            opacity: 0.2,
            width: "80%",
            mx: "auto",
          }}
        />

        <BestSelling />
        <Divider
          sx={{
            my: 6,
            borderColor: theme.Text2,
            opacity: 0.2,
            width: "80%",
            mx: "auto",
          }}
        />

        <PromoBanner />
        <Divider
          sx={{
            my: 6,
            borderColor: theme.Text2,
            opacity: 0.2,
            width: "80%",
            mx: "auto",
          }}
        />

        <ExploreProducts />
        <Divider
          sx={{
            my: 6,
            borderColor: theme.Text2,
            opacity: 0.2,
            width: "80%",
            mx: "auto",
          }}
        />

        <NewArrival />

        {/* Feature Cards */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={6} justifyContent="center">
            {[
              {
                icon: IconDelivery,
                title: "FREE AND FAST DELIVERY",
                text: "Free delivery for all orders over $140",
              },
              {
                icon: IconCustomer,
                title: "24/7 CUSTOMER SERVICE",
                text: "Friendly 24/7 customer support",
              },
              {
                icon: IconSecure,
                title: "MONEY BACK GUARANTEE",
                text: "We return money within 30 days",
              },
            ].map((f, i) => (
              <Grid item key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <FeatureCard {...f} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </Stack>
  );
};

export default Homepage;
