import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid as SwiperGrid, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

import { useTheme } from "../../../theme/ThemeProvider";
import { useProductsState } from "../../../store/productStore";
import ProductCard from "../../../shared/components/Product-card";
import ArrowNavigation from "../../../shared/components/Arrow-navigation";
import { useNavigate } from "react-router";

const getRandomColors = (count: number = 3) => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(color);
  }
  return colors;
};

const ExploreProducts: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const { products } = useProductsState();

  const productsWithColors = useMemo(
    () =>
      products.map((p) => ({
        ...p,
        colors: p.colors || getRandomColors(3),
      })),
    [products]
  );

  const displayedProducts = productsWithColors.slice(0, 8);

  return (
    <Box
      sx={{
        mt: 8,
        color: theme.Text1,
        bgcolor: theme.primary1,
        pl: isMobile ? 1 : 8,
        pr: isMobile ? 1 : 8,
      }}
    >
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
          Our Products
        </Typography>
      </Box>

      {/* Title + Arrows */}
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
            mt: isMobile ? 1 : 0,
            fontSize: isMobile ? "1.5rem" : "2rem",
          }}
        >
          Explore Our Products
        </Typography>

        {/* 🔹 Arrow Navigation */}
        <Box mt={isMobile ? 1 : 0}>
          <ArrowNavigation
            prevClass="explore-prev"
            nextClass="explore-next"
            isMobile={isMobile}
          />
        </Box>
      </Box>

      {/* Swiper Grid */}
      <Swiper
        spaceBetween={20}
        grid={{ rows: 2, fill: "row" }}
        watchOverflow={false}
        allowTouchMove={true}
        breakpoints={{
          1200: { slidesPerView: 4 },
          1000: { slidesPerView: 3.1 },
          900: { slidesPerView: 2.4 },
          600: { slidesPerView: 1.3 },
          0: { slidesPerView: 1 },
        }}
        navigation={{ nextEl: ".explore-next", prevEl: ".explore-prev" }}
        modules={[Navigation, SwiperGrid]}
      >
        {displayedProducts.map((p) => (
          <SwiperSlide key={p.id}>
            <ProductCard
              id={p.id}
              name={p.title}
              price={`$${p.price}`}
              oldPrice={p.oldPrice ?? undefined}
              discount={p.discount}
              rating={p.rating ?? 0}
              img={p.images?.[0] ?? ""}
              isNew={p.isNew}
              colors={Array.isArray(p.colors) ? p.colors : undefined}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All Button */}
      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          sx={{
            px: 6,
            py: 1.5,
            mt: 2,
            fontSize: 15,
            textTransform: "none",
            borderRadius: 1,
            bgcolor: theme.Button2,
            "&:hover": { bgcolor: "#cc0000" },
          }}
          onClick={() => navigate("/products?withColors=true")}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default ExploreProducts;
