import React from "react";
import { Container, Grid, Stack } from "@mui/material";
import FilterSidebar from "./components/FilterSidebar";
import HeroSwiper from "./components/HeroSwiper";
import FlashSales from "./components/FlashSales";
import Categories from "./components/Categories";
import BestSelling from "./components/BestSelling";
import PromoBanner from "./components/PromoBanner";
import ExploreProducts from "./components/ExploreProducts";
import NewArrival from "./components/NewArrival";
import FeatureCard from "../../shared/components/FeatureCard";

import IconDelivery from "../../assets/About/icon-delivery.svg";
import IconCustomer from "../../assets/About/Icon-Customerservice.svg";
import IconSecure from "../../assets/About/Icon-secure.svg";
import { useTheme } from "../../theme/ThemeProvider";

const Homepage: React.FC = () => {
  const{theme}=useTheme()
  return (
    <Stack sx={{ bgcolor:theme.primary1 }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Grid container spacing={2} sx={{ mt: 4, alignItems: "flex-start" }}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <FilterSidebar />
          </Grid>

          {/* Slider */}
          <Grid item xs={12} md={9}>
            <HeroSwiper />
          </Grid>
        </Grid>

        {/* Other Sections */}
        <FlashSales />
        <Categories />
        <BestSelling />
        <PromoBanner />
        <ExploreProducts />
        <NewArrival />

        {/* Feature Cards */}
        <Container
          maxWidth="lg"
          sx={{
            py: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={6}>
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
              <Grid item xs={12} md={4} key={i}>
                <FeatureCard {...f} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </Stack>
  );
};

export default Homepage;
