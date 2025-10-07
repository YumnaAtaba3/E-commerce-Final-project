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
import { useNavigate } from "react-router";

import ProductCard from "../../../shared/components/Product-card";
import { useTheme } from "../../../theme/ThemeProvider";
import { useProductsState } from "../../../store";
import { appRoutes } from "../../../routes";

const BestSelling: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const { products } = useProductsState();
  const navigate = useNavigate();

  // first 8 products
  const bestProducts = products.slice(0, 8);

  const handleViewAll = () => {
   navigate(appRoutes.products.list);

  };

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

      {/* Title + View All */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={isMobile ? "wrap" : "nowrap"}
        mb={3}
      >
        <Typography
          sx={{
            fontWeight: 500,
            color: theme.Text1,
            fontSize: isMobile ? "1.5rem" : "3rem",
          }}
        >
          Best Selling Products
        </Typography>

        {!isMobile && (
          <Button
            variant="contained"
            onClick={handleViewAll}
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
        )}
      </Box>

      {/* Swiper */}
      <Swiper
        spaceBetween={0}
        slidesPerView={isMobile ? 1.1 : 4.1}
        navigation={{ nextEl: ".best-next", prevEl: ".best-prev" }}
        modules={[Navigation]}
      >
        {bestProducts.map((p) => (
          <SwiperSlide key={p.id}>
            <ProductCard
              id={p.id}
              name={p.title}
              price={`$${p.price}`}
              discount={p.discount}
              rating={p.rating}
              img={p.images?.[0]}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile View All Button */}
      {isMobile && (
        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            onClick={handleViewAll}
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
