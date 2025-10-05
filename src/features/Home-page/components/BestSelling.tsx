import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../../../shared/components/Product-card";
import { useTheme } from "../../../theme/ThemeProvider";

const bestProducts = [
  {
    id: 1,
    name: "The north coat",
    price: "$260",
    oldPrice: "$360",
    rating: 4.5,
    img: "../../../assets/HomePage/jacket.png",
  },
  {
    id: 2,
    name: "Gucci duffle bag",
    price: "$960",
    oldPrice: "$1160",
    rating: 5,
    img: "../../../assets/HomePage/jacket.png",
  },
  {
    id: 3,
    name: "RGB liquid CPU Cooler",
    price: "$160",
    oldPrice: "$200",
    rating: 4,
    img: "../../../assets/HomePage/jacket.png",
  },
  {
    id: 4,
    name: "Small bookshelf",
    price: "$360",
    oldPrice: "$400",
    rating: 4.5,
    img: "../../../assets/HomePage/jacket.png",
  },
];

const BestSelling: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  return (
    <Box sx={{ mt: 8, pl: isMobile ? 1 : 8, pr: isMobile ? 1 : 8 }}>
      {/* Section Label */}
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Box
          sx={{
            width: 20,
            height: 40,
            bgcolor: theme.Button2,
            borderRadius: 1,
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.Button2 }}>
          This Month
        </Typography>
      </Box>

      {/* Header Row with title and arrows */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={isMobile ? "wrap" : "nowrap"}
        mb={3}
      >
        <Typography
          variant={isMobile ? "h3" : "h2"}
          sx={{
            fontWeight: 500,
            color: theme.Text1,
            mt: isMobile ? 1 : 0,
            fontSize: isMobile ? "1.5rem" : "1.8rem",
          }}
        >
          Best Selling Products
        </Typography>

        <Box mt={isMobile ? 1 : 0} display="flex" alignItems="center" gap={2}>
          {/* Swiper navigation arrows */}
          <Box className="best-prev" />
          <Box className="best-next" />

          {/* Optional View All Button */}
          {!isMobile && (
            <Button
              variant="contained"
              sx={{
                px: 6,
                py: 1.5,
                fontSize: 14,
                fontWeight: 400,
                textTransform: "none",
                bgcolor: theme.Button2,
                "&:hover": { bgcolor: "#cc0000" },
              }}
            >
              View All
            </Button>
          )}
        </Box>
      </Box>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={0}
        slidesPerView={isMobile ? 1.1 : 4.1}
        breakpoints={{
          1200: { slidesPerView: 4 },
          1000: { slidesPerView: 3.1 },
          900: { slidesPerView: 2.4 },
          600: { slidesPerView: 1.3 },
          0: { slidesPerView: 1.1 },
        }}
        navigation={{ nextEl: ".best-next", prevEl: ".best-prev" }}
        modules={[Navigation]}
      >
        {bestProducts.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile View All Button */}
      {isMobile && (
        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            sx={{
              px: 6,
              py: 1.5,
              fontSize: 14,
              textTransform: "none",
              bgcolor: theme.Button2,
              "&:hover": { bgcolor: "#cc0000" },
            }}
          >
            View All
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BestSelling;
