import React from "react";
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
import ExploreProductCard from "./ExploreProductCard";

import palystation from "../../../assets/Homepage/playstation.png";
import ArrowNavigation from "../../../shared/components/ArrowNavigation";

const exploreProducts = [
  {
    id: 1,
    name: "Canon EOS DSLR Camera",
    price: "$360",
    oldPrice: "$400",
    discount: "-10%",
    rating: 4.8,
    img: palystation,
    colors: ["#000", "#555"],
  },
  {
    id: 2,
    name: "Kids Electric Car",
    price: "$300",
    oldPrice: "$350",
    isNew: true,
    rating: 4.3,
    img: "https://via.placeholder.com/200?text=Toy+Car",
    colors: ["#f00", "#00f", "#000"],
  },
  {
    id: 4,
    name: "Soccer Cleats",
    price: "$90",
    oldPrice: "$120",
    discount: "-25%",
    rating: 4.7,
    img: palystation,
    isNew: true,
    colors: ["#0f0", "#ff0"],
  },
  {
    id: 5,
    name: "Curology Product Set",
    price: "$50",
    oldPrice: "$65",
    rating: 4.0,
    img: "https://via.placeholder.com/200?text=Cosmetic",
  },
  {
    id: 6,
    name: "Breed Dry Dog Food",
    price: "$100",
    oldPrice: "$120",
    discount: "-20%",
    rating: 4.5,
    img: palystation,
  },
];

const ExploreProducts: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

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
      {/* Section Title */}
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
          Our Products
        </Typography>
      </Box>

      {/* Heading and Arrow Navigation */}
      <Box
        display="flex"
        flexDirection="row" // keep row on all screens
        justifyContent="space-between"
        alignItems="center"
        flexWrap={isMobile ? "wrap" : "nowrap"} // wrap on small screens
        mb={3}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mt: isMobile ? 1 : 0,
            fontSize: isMobile ? "1.5rem" : "2rem",
          }}
        >
          Explore Our Products
        </Typography>

        <Box mt={isMobile ? 1 : 0}>
          <ArrowNavigation
            prevClass="explore-prev"
            nextClass="explore-next"
            isMobile={isMobile}
          />
        </Box>
      </Box>

      {/* Swiper with 2 rows */}
      <Swiper
        spaceBetween={0}
        slidesPerView={isMobile ? 2 : 4}
        grid={{ rows: 2, fill: "row" }}
        breakpoints={{
          1200: { slidesPerView: 4 },
          900: { slidesPerView: 3 },
          600: { slidesPerView: 1.3 },
          0: { slidesPerView: 1.1 },
        }}
        navigation={{ nextEl: ".explore-next", prevEl: ".explore-prev" }}
        modules={[Navigation, SwiperGrid]}
      >
        {exploreProducts.map((item) => (
          <SwiperSlide key={item.id}>
            <ExploreProductCard {...item} />
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
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default ExploreProducts;
