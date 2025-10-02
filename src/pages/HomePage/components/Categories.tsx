import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import ArrowNavigation from "../../../shared/components/ArrowNavigation";

import { useTheme } from "../../../theme/ThemeProvider";

import CategoryCamera from "../../../assets/Category/Category-Camera.svg";
import CategoryCellPhone from "../../../assets/Category/Category-CellPhone.svg";
import CategoryComputer from "../../../assets/Category/Category-Computer.svg";
import CategoryGamepad from "../../../assets/Category/Category-Gamepad.svg";
import CategoryWatch from "../../../assets/Category/Category-SmartWatch.svg";
import CategoryHeadphone from "../../../assets/Category/Category-Headphone.svg";

const categories = [
  { name: "Phones", icon: CategoryCellPhone },
  { name: "Computers", icon: CategoryComputer },
  { name: "Smartwatch", icon: CategoryWatch },
  { name: "Camera", icon: CategoryCamera },
  { name: "Headphones", icon: CategoryHeadphone },
  { name: "Gaming", icon: CategoryGamepad },
];

const Categories: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  return (
    <Box sx={{ mt: 8, pl: isMobile ? 2 : 8, pr: isMobile ? 2 : 8 }}>
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
        <Typography variant="h5" sx={{ fontWeight: 700, color: theme.Button2 }}>
          Categories
        </Typography>
      </Box>

      {/* Header Row with arrows */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={isMobile ? "wrap" : "nowrap"}
        mb={3}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{
            fontWeight: 500,
            color: theme.Text1,
            mt: isMobile ? 1 : 0,
            fontSize: isMobile ? "1.5rem" : "2.7rem",
          }}
        >
          Browse By Category
        </Typography>

        <Box >
          <ArrowNavigation prevClass="cat-prev" nextClass="cat-next" />
        </Box>
      </Box>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={0}
        slidesPerView={5}
        navigation={{ nextEl: ".cat-next", prevEl: ".cat-prev" }}
        modules={[Navigation]}
        breakpoints={{
          1200: { slidesPerView: 6 },
          900: { slidesPerView: 4.2 },
          600: { slidesPerView: 3.2 },
          0: { slidesPerView: 1.5 },
        }}
      >
        {categories.map((cat, i) => (
          <SwiperSlide key={i}>
            <Card
              sx={{
                textAlign: "center",
                border: "1px solid #ddd",
                cursor: "pointer",
                width: 190,
                height: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: theme.Button2,
                  color: "white",
                  "& img": { filter: "brightness(0) invert(1)" },
                },
              }}
            >
              <CardContent>
                <Box
                  component="img"
                  src={cat.icon}
                  alt={cat.name}
                  sx={{ width: 40, mb: 1, transition: "all 0.3s ease" }}
                />
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {cat.name}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Categories;
