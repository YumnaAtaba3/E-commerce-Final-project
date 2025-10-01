import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Rating,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import palystation from "../../../assets/Homepage/playstation.png";
import { useTheme } from "../../../theme/ThemeProvider";

// Demo Products
const flashProducts = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: "$120",
    oldPrice: "$160",
    discount: "-25%",
    rating: 4.5,
    img: palystation,
  },
  {
    id: 2,
    name: "RGB Keyboard",
    price: "$80",
    oldPrice: "$120",
    discount: "-30%",
    rating: 4.0,
    img: palystation,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    price: "$400",
    oldPrice: "$500",
    discount: "-20%",
    rating: 5,
    img: palystation,
  },
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: "$120",
    oldPrice: "$160",
    discount: "-25%",
    rating: 4.5,
    img: palystation,
  },
  {
    id: 2,
    name: "RGB Keyboard",
    price: "$80",
    oldPrice: "$120",
    discount: "-30%",
    rating: 4.0,
    img: palystation,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    price: "$400",
    oldPrice: "$500",
    discount: "-20%",
    rating: 5,
    img: palystation,
  },
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: "$120",
    oldPrice: "$160",
    discount: "-25%",
    rating: 4.5,
    img: palystation,
  },
  {
    id: 2,
    name: "RGB Keyboard",
    price: "$80",
    oldPrice: "$120",
    discount: "-30%",
    rating: 4.0,
    img: palystation,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    price: "$400",
    oldPrice: "$500",
    discount: "-20%",
    rating: 5,
    img: palystation,
  },
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: "$120",
    oldPrice: "$160",
    discount: "-25%",
    rating: 4.5,
    img: palystation,
  },
  {
    id: 2,
    name: "RGB Keyboard",
    price: "$80",
    oldPrice: "$120",
    discount: "-30%",
    rating: 4.0,
    img: palystation,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    price: "$400",
    oldPrice: "$500",
    discount: "-20%",
    rating: 5,
    img: palystation,
  },
];

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

 

  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft(calculateTimeLeft(endDate)),
      1000
    );
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
            <Typography sx={{ fontSize: 12, color: "gray" }}>
              {t.label}
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 22 }}>
              {String(t.value).padStart(2, "0")}
            </Typography>
          </Box>
          {idx < arr.length - 1 && (
            <Typography
              sx={{
                fontSize: 24,
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
    <Box sx={{ mt: 8, color: theme.Text1, bgcolor: theme.primary1 }}>
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
        <Typography variant="h5" sx={{ fontWeight: 700, color: theme.Button2 }}>
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
            variant="h3"
            sx={{ fontWeight: 800, mt: isMobile ? 2 : 0 }}
          >
            Flash Sales
          </Typography>
          {/* Timer below on mobile, inline on desktop */}
          {!isMobile && Timer}
          {!isMobile && <Typography sx={{ width: "50%" }} />}
          {/* Arrows */}{" "}
          <Box display="flex" gap={1}>
            {" "}
            <IconButton
              className="flash-prev"
              sx={{
                border: "1px solid gray",
                borderRadius: "50%",
                width: 40,
                height: 40,
                bgcolor: "#f5f5f5",
                "&:hover": {
                  bgcolor: theme.Button2,
                  color: "white",
                  borderColor: theme.Button2,
                },
              }}
            >
              {" "}
              <ArrowBackIcon fontSize="large" />{" "}
            </IconButton>{" "}
            <IconButton
              className="flash-next"
              sx={{
                border: "1px solid gray",
                borderRadius: "50%",
                width: 40,
                height: 40,
                bgcolor: "#f5f5f5",
                "&:hover": {
                  bgcolor: theme.Button2,
                  color: "white",
                  borderColor: theme.Button2,
                },
              }}
            >
              {" "}
              <ArrowForwardIcon fontSize="large" />{" "}
            </IconButton>{" "}
          </Box>{" "}
        </Box>
      </Box>

      {isMobile && Timer}

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={0}
        slidesPerView={isMobile ? 1.4: 4.1} 
        breakpoints={{
          1200: { slidesPerView: 4.1, spaceBetween: 0 },
          900: { slidesPerView: 3, spaceBetween: 0 },
          600: { slidesPerView: 2, spaceBetween: 0 },
          0: { slidesPerView: 1.4, spaceBetween: 0 },
        }}
        navigation={{ nextEl: ".flash-next", prevEl: ".flash-prev" }}
        modules={[Navigation]}
      >
        {flashProducts.map((item) => (
          <SwiperSlide key={item.id}>
            <Card
              sx={{
                alignItems: "center",
                width: 330,
                height: 350,
                borderRadius: 2,
                boxShadow: 1,
                overflow: "hidden",
                position: "relative",
                "&:hover .hoverOverlay": { opacity: 1, bottom: 0 },
              }}
            >
              {/* Discount Badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: 15,
                  left: 15,
                  bgcolor: theme.Button2,
                  color: "#fff",
                  px: 1.2,
                  py: 0.3,
                  borderRadius: 1,
                  fontSize: 14,
                  textAlign: "center",
                  height: "20px",
                  zIndex: 2,
                }}
              >
                {item.discount}
              </Box>

              {/* Icons */}
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  zIndex: 2,
                }}
              >
                <IconButton
                  sx={{
                    bgcolor: "white",
                    "&:hover": { bgcolor: theme.Button2, color: "white" },
                    width: 42,
                    height: 42,
                  }}
                >
                  <FavoriteBorderIcon fontSize="large" />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: "white",
                    "&:hover": { bgcolor: theme.Button2, color: "white" },
                    width: 42,
                    height: 42,
                  }}
                >
                  <VisibilityOutlinedIcon fontSize="large" />
                </IconButton>
              </Box>

              {/* Product Image */}
              <Box
                sx={{
                  bgcolor: "#f5f5f5",
                  p: 2,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={item.img}
                  alt={item.name}
                  sx={{ objectFit: "contain", mx: "auto" }}
                />

                <Box
                  className="hoverOverlay"
                  sx={{
                    position: "absolute",
                    bottom: "-100%",
                    left: 0,
                    width: "100%",
                    bgcolor: "black",
                    color: "#fff",
                    py: 1,
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Button
                    fullWidth
                    sx={{
                      bgcolor: "black",
                      color: "white",
                      fontSize: 16,
                      fontWeight: 500,
                      "&:hover": { bgcolor: "#222" },
                    }}
                    startIcon={<ShoppingCartOutlinedIcon />}
                  >
                    Add To Cart
                  </Button>
                </Box>
              </Box>

              {/* Product Info */}
              <CardContent sx={{ bgcolor: "white", textAlign: "left" }}>
                <Typography
                  sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}
                  noWrap
                >
                  {item.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography
                    sx={{ fontSize: 16, color: theme.Button2, fontWeight: 600 }}
                  >
                    {item.price}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "gray",
                      textDecoration: "line-through",
                    }}
                  >
                    {item.oldPrice}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Rating
                    value={item.rating}
                    precision={0.5}
                    readOnly
                    size="large"
                  />
                  <Typography sx={{ fontSize: 14, color: "gray" }}>
                    ({item.rating})
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All Button */}
      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            mt: 2,
            fontSize: 16,
            borderRadius: 2,
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
