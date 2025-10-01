import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Box, Typography, Link } from "@mui/material";
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

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop
      autoplay={{ delay: 4000 }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      style={{ maxWidth: "1000px", height: "400px" }}
      className="custom-swiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "black",
              borderRadius: 3,
              px: 6,
              py: 4,
              height: "100%",
              color: "white",
              position: "relative",
            }}
          >
            {/* Text content */}
            <Box
              sx={{
                flex: 1,
                maxWidth: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                height: "100%",
                pt: 2,
              }}
            >
              {/* Logo and Title */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  component="img"
                  src={appleLogo}
                  alt="Logo"
                  sx={{ width: 40, height: 40, mr: 3 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 400, textTransform: "uppercase" }}
                >
                  {slide.title}
                </Typography>
              </Box>

              {/* Subtitle */}
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  fontSize: 43,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}
              >
                {slide.subtitle}
              </Typography>

              {/* Shop Now Link with solid white underline */}
              <Link
                href="#"
                sx={{
                  pt: 5,
                  
                  color: theme.secound1,
                  fontWeight: 400,
                  fontSize: "16px",
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
                maxWidth: "45%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </SwiperSlide>
      ))}

      {/* Custom pagination styles */}
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
