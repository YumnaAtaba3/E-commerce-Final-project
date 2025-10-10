import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Box,
  Typography,
  Link,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import { motion } from "framer-motion";

import heroImg from "../../../assets/Home-page/hero_endframe__cvklg0xk3w6e_large 2.svg";
import appleLogo from "../../../assets/Home-page/1200px-Apple_gray_logo 1.svg";

const slides = [
  {
    id: 1,
    title: "IPHONE 14 SERIES",
    subtitle: "UP TO 10% OFF VOUCHER",
    img: heroImg,
  },
  {
    id: 2,
    title: "IPHONE 13 SERIES",
    subtitle: "UP TO 80% OFF VOUCHER",
    img: heroImg,
  },
  {
    id: 3,
    title: "IPHONE 40 SERIES",
    subtitle: "UP TO 20% OFF VOUCHER",
    img: heroImg,
  },
];

const HeroSwiper: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000 }}
        centeredSlides
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        style={{
          width: "100%",
          height: isMobile ? 300 : 450,
          maxWidth: "1020px",
          marginLeft: isMobile ? 0 : 40,
        }}
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
                perspective: 1200,
              }}
            >
              {/* Left Column */}
              <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                  flex: 1,
                  maxWidth: isMobile ? "100%" : "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Apple Logo */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Box
                    component="img"
                    src={appleLogo}
                    alt="Logo"
                    sx={{
                      width: { xs: 30, sm: 40 },
                      height: { xs: 30, sm: 40 },
                      mr: 3,
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
                </motion.div>

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

                {/* Shop Now */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ marginTop: 20 }}
                >
                  <Link
                    href="#"
                    sx={{
                      pt: 2,
                      color: theme.secound1,
                      fontWeight: 500,
                      fontSize: { xs: 14, sm: 16 },
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      borderBottom: "2px solid white",
                      overflow: "hidden",
                      position: "relative",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        width: "100%",
                        height: "2px",
                        bgcolor: theme.Button2,
                        transform: "scaleX(0)",
                        transformOrigin: "right",
                        transition: "transform 0.4s ease",
                      },
                      "&:hover:after": {
                        transform: "scaleX(1)",
                        transformOrigin: "left",
                      },
                    }}
                  >
                    Shop Now →
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Column: Phone Image */}
              <motion.div
                initial={{ x: 0, scale: 1 }}
                animate={{ scale: [1, 1.5, 1] }} // pop forward and back
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{
                  flex: 1,
                  maxWidth: isMobile ? "100%" : "45%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={slide.img}
                  alt={slide.title}
                  sx={{
                    width: "100%",
                    objectFit: "contain",
                    height: { xs: 150, sm: "100%" },
                    transform: "translateZ(0)",
                  }}
                />
              </motion.div>
            </Box>
          </SwiperSlide>
        ))}

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
    </Box>
  );
};

export default HeroSwiper;
