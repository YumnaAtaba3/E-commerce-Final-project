import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Box,
  Typography,
  Link,
  useTheme as useMuiTheme,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

import heroImg from "../../../assets/Homepage/hero_endframe__cvklg0xk3w6e_large 2.svg";
import appleLogo from "../../../assets/Homepage/1200px-Apple_gray_logo 1.svg";

const slides = [
  {
    id: 1,
    title: "IPHONE 14 SERIES",
    subtitle: "UP TO 10% OFF VOUCHER",
    img: heroImg,
  },
  {
    id: 2,
    title: "IPHONE 14 SERIES",
    subtitle: "UP TO 10% OFF VOUCHER",
    img: heroImg,
  },
  {
    id: 3,
    title: "IPHONE 14 SERIES",
    subtitle: "UP TO 10% OFF VOUCHER",
    img: heroImg,
  },
];

const HeroSwiper: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      style={{ width: "100%", height: isMobile ? 300 : 400, maxWidth:"1020px",marginLeft:isMobile?0:40 }}
      
      className="custom-swiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "black",
              borderRadius: 3,
              px: { xs: 3, sm: 6 },
              py: { xs: 3, sm: 4 },
              height: "100%",
              color: "white",
              position: "relative",
            }}
          >
            {/* Text content */}
            <Box
              sx={{
                flex: 1,
                maxWidth: { xs: "100%", sm: "50%" },
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
                justifyContent: "flex-start",
                height: "100%",
                pt: { xs: 0, sm: 2 },
                textAlign: { xs: "center", sm: "left" },
                mb: { xs: 2, sm: 0 },
              }}
            >
              {/* Logo and Title */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Box
                  component="img"
                  src={appleLogo}
                  alt="Logo"
                  sx={{
                    width: { xs: 30, sm: 40 },
                    height: { xs: 30, sm: 40 },
                    mr: { xs: 0, sm: 3 },
                    mb: { xs: 1, sm: 0 },
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 400,
                    textTransform: "uppercase",
                    fontSize: { xs: 14, sm: 16 },
                  }}
                >
                  {slide.title}
                </Typography>
              </Box>

              {/* Subtitle */}
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  fontSize: { xs: 24, sm: 36, md: 43 },
                  fontWeight: 500,
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}
              >
                {slide.subtitle}
              </Typography>

              {/* Shop Now Link */}
              <Link
                href="#"
                sx={{
                  pt: 2,
                  color: theme.secound1,
                  fontWeight: 400,
                  fontSize: { xs: 14, sm: 16 },
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  borderBottom: "2px solid white",
                  transition: "0.3s",
                  "&:hover": { color: theme.Button2 },
                }}
              >
                Shop Now →
              </Link>
            </Box>

            {/* Slide Image */}
            <Box
              component="img"
              src={slide.img}
              alt={slide.title}
              sx={{
                flex: 1,
                maxWidth: { xs: "100%", sm: "45%" },
                height: { xs: 150, sm: "100%" },
                objectFit: "contain",
              }}
            />
          </Box>
        </SwiperSlide>
      ))}

      {/* Custom pagination */}
      <style>
        {`
          .custom-swiper .swiper-pagination-bullet {
            width: 14px;
            height: 14px;
            background-color: grey;
            opacity: 1;
            margin: 0 6px;
            border-radius: 50%;
          }
          .custom-swiper .swiper-pagination-bullet-active {
            width: 14px;
            height: 14px;
            background-color: ${theme.Button2};
            border: 2px solid #fff;
            border-radius: 50%;
          }
        `}
      </style>
    </Swiper>
  );
};

export default HeroSwiper;
