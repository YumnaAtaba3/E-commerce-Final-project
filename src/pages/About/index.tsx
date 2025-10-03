import React from "react";
import { Box, Container, Grid } from "@mui/material";
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
import Frame874 from "../../assets/About/Frame 874.png";
import Frame875 from "../../assets/About/Frame 875.png";
import Frame876 from "../../assets/About/Frame 876.png";
import IconDelivery from "../../assets/About/icon-delivery.svg";
import IconCustomer from "../../assets/About/Icon-Customerservice.svg";
import IconSecure from "../../assets/About/Icon-secure.svg";
import IconShop from "../../assets/About/shop.svg";
import IconSale from "../../assets/About/Icon-Sale.svg";
import IconMoneybag from "../../assets/About/Icon-Moneybag.svg";
import Icon_Shopping_bag from "../../assets/About/Icon-Shoppingbag.svg";

const AboutPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box sx={{ bgcolor: theme.bgColor }}>
      <Breadcrumb current="About" />

      <OurStory
        image={SideImage}
        title="Our Story"
        paragraphs={[
          "Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.",
          "Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer…",
        ]}
      />

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
            <Grid item xs={12} sm={6} md={3} key={i}>
              <StatCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        pagination={{ clickable: true }}
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
        {[
          { img: Frame874, name: "Tom Cruise", role: "Founder & Chairman" },
          { img: Frame875, name: "Emma Watson", role: "Managing Director" },
          { img: Frame876, name: "Will Smith", role: "Product Designer" },
          { img: Frame874, name: "Tom Cruise", role: "Founder & Chairman" },
          { img: Frame875, name: "Emma Watson", role: "Managing Director" },
          { img: Frame876, name: "Will Smith", role: "Product Designer" },
        ].map((member, i) => (
          <SwiperSlide key={i}>
            <StaffCard {...member} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Box
        className="custom-swiper-pagination"
        sx={{
          mt: 6,
          display: "flex",
          justifyContent: "center",
          "& .swiper-pagination-bullet": {
            backgroundColor: "#999",
            opacity: 1,
          },
          "& .swiper-pagination-bullet-active": {
            backgroundColor: theme.Button2,
          },
        }}
      />

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
    </Box>
  );
};

export default AboutPage;
