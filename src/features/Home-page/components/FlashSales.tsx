import React, { useEffect, useState } from "react";
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

import { useTheme } from "../../../theme/ThemeProvider";
import ArrowNavigation from "../../../shared/components/Arrow-navigation";
import ProductCard from "../../../shared/components/Product-card";
import { useProductsState } from "../../../store";

// Countdown logic
const calculateTimeLeft = (endDate: Date) => {
  const diff = endDate.getTime() - new Date().getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const FlashSales: React.FC = () => {
  const endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days demo
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));

  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const { products } = useProductsState();
  const navigate = useNavigate();

  // 👇 Get only the first 8 products that have a discount
  const flashProducts = products.filter((p) => p.discount).slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const Timer = (
    <Box
      display="flex"
      alignItems="center"
      gap={1.5}
      flexWrap="wrap"
      mt={isMobile ? 1 : 0}
      mb={isMobile ? 1 : 0}
    >
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map((t, idx, arr) => (
        <React.Fragment key={idx}>
          <Box textAlign="center" minWidth={50}>
            <Typography
              sx={{
                fontSize: { xs: 10, md: 12, lg: 14, xl: 14 },
                color: "gray",
              }}
            >
              {t.label}
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 10, md: 12, lg: 22, xl: 22 },
              }}
            >
              {String(t.value).padStart(2, "0")}
            </Typography>
          </Box>
          {idx < arr.length - 1 && (
            <Typography
              sx={{
                fontSize: { xs: 4, md: 4, lg: 4, xl: 20 },
                fontWeight: 700,
                color: theme.Button2,
                mx: 0.5,
              }}
            >
              :
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        mt: 8,
        color: theme.Text1,
        bgcolor: theme.primary1,
        pl: isMobile ? 1 : 8,
      }}
    >
      {/* Row 1 - Today's */}
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
          Today's
        </Typography>
      </Box>

      {/* Row 2 - Flash Sales + Arrows */}
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        mb={3}
      >
        {/* Title + arrows row */}
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
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
            Flash Sales
          </Typography>
          {!isMobile && Timer}
          {!isMobile && <Typography sx={{ width: "50%" }} />}
          <ArrowNavigation
            prevClass="flash-prev"
            nextClass="flash-next"
            isMobile={isMobile}
          />
        </Box>
      </Box>

      {isMobile && Timer}

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
        navigation={{ nextEl: ".flash-next", prevEl: ".flash-prev" }}
        modules={[Navigation]}
      >
        {flashProducts.map((p) => (
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

      {/* View All Button */}
      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          onClick={() => navigate("/products?filter=discount")}
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
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default FlashSales;
