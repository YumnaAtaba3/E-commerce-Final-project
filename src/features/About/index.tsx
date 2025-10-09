import React from "react";
import { Box, Container, Grid, Skeleton, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Breadcrumb from "./components/Breadcrumb";
import OurStory from "./components/OurStory";
import StatCard from "./components/StatCard";
import StaffCard from "./components/StaffCard";
import FeatureCard from "../../shared/components/Feature-card";

import { useTheme } from "../../theme/ThemeProvider";

// Assets
import SideImage from "../../assets/About/Side-Image.png";
import IconDelivery from "../../assets/About/icon-delivery.svg";
import IconCustomer from "../../assets/About/Icon-Customerservice.svg";
import IconSecure from "../../assets/About/Icon-secure.svg";
import IconShop from "../../assets/About/shop.svg";
import IconSale from "../../assets/About/Icon-Sale.svg";
import IconMoneybag from "../../assets/About/Icon-Moneybag.svg";
import Icon_Shopping_bag from "../../assets/About/Icon-Shoppingbag.svg";

import staff1 from "./../../assets/About/Frame 874.png";
import staff2 from "./../../assets/About/Frame 875.png";
import staff3 from "./../../assets/About/Frame 876.png";

// Sample staff data
const staffMembers = [
  { img: staff1, name: "John Doe", role: "CEO" },
  { img: staff2, name: "Jane Smith", role: "CTO" },
  { img: staff3, name: "Alice Johnson", role: "Designer" },
  { img: staff2, name: "Bob Williams", role: "Developer" },
  { img: staff1, name: "John Doe", role: "CEO" },
];

interface AboutPageProps {
  isLoading?: boolean;
}

const AboutPage: React.FC<AboutPageProps> = ({ isLoading = false }) => {
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <Stack spacing={6} sx={{ bgcolor: theme.primary1, p: 4 }}>
        {/* Breadcrumb */}
        <Skeleton variant="rectangular" width={200} height={40} />

        {/* Our Story */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
          </Grid>
        </Grid>

        {/* Stat Cards */}
        <Grid container spacing={4} justifyContent="center">
          {[...Array(4)].map((_, i) => (
            <Grid item key={i}>
              <Skeleton variant="rectangular" width={180} height={150} />
            </Grid>
          ))}
        </Grid>

        {/* Staff Carousel */}
        <Skeleton variant="text" width={200} height={40} />
        <Grid container spacing={3}>
          {[...Array(3)].map((_, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Skeleton variant="rectangular" width="100%" height={300} />
            </Grid>
          ))}
        </Grid>

        {/* Feature Cards */}
        <Grid container spacing={6} justifyContent="center">
          {[...Array(3)].map((_, i) => (
            <Grid item key={i}>
              <Skeleton variant="rectangular" width={250} height={150} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    );
  }

  return (
    <Box sx={{ bgcolor: theme.primary1, width: "100%" }}>
      {/* Breadcrumb */}
      <Breadcrumb current="About" />

      {/* Our Story Section */}
      <OurStory
        image={SideImage}
        title="Our Story"
        paragraphs={[
          "Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.",
          "Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer…",
        ]}
      />

      {/* Statistics */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              icon: IconShop,
              value: "10.5k",
              text: "Sellers active on our site",
            },
            { icon: IconSale, value: "33k", text: "Monthly Product Sale" },
            {
              icon: Icon_Shopping_bag,
              value: "45.5k",
              text: "Customers active",
            },
            { icon: IconMoneybag, value: "25k", text: "Annual gross sale" },
          ].map((item, i) => (
            <Grid item key={i}>
              <StatCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Staff Carousel */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
          }}
          modules={[Pagination]}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          style={
            {
              "--swiper-pagination-color": theme.Button2,
              "--swiper-pagination-bullet-inactive-color": "#999",
            } as React.CSSProperties
          }
        >
          {staffMembers.map((member, i) => (
            <SwiperSlide key={i}>
              <StaffCard {...member} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Box
          className="custom-swiper-pagination"
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            gap: 1,
            "& .swiper-pagination-bullet": {
              width: 15,
              height: 15,
              backgroundColor: "#999",
              opacity: 1,
              borderRadius: "50%",
              transition: "all 0.3s ease",
            },
            "& .swiper-pagination-bullet-active": {
              backgroundColor: theme.Button2,
              border: `3px solid #ddd`,
              boxSizing: "border-box",
            },
          }}
        />
      </Container>

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
            <Grid item key={i}>
              <FeatureCard {...f} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
