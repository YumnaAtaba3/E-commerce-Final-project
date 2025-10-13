import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router";
import { motion, type Variants, easeOut } from "framer-motion";

import ArrowNavigation from "../../../shared/components/Arrow-navigation";
import { useTheme } from "../../../theme/ThemeProvider";
import { useCategoriesQuery } from "../hooks/useCategoriesQuery";

import CategoryCamera from "../../../assets/Category/Category-Camera.svg";
import CategoryCellPhone from "../../../assets/Category/Category-CellPhone.svg";
import CategoryComputer from "../../../assets/Category/Category-Computer.svg";
import CategoryGamepad from "../../../assets/Category/Category-Gamepad.svg";
import CategoryWatch from "../../../assets/Category/Category-SmartWatch.svg";
import CategoryHeadphone from "../../../assets/Category/Category-Headphone.svg";
import DefaultCategoryIcon from "../../../assets/Category/Category-Gamepad.svg";
import clothes from "../../../assets/Category/clothes.svg";
import furniture from "../../../assets/Category/furniture-removebg-preview.svg";
import luxery from "../../../assets/Category/luxery-removebg-preview.svg";
import shoes from "../../../assets/Category/shoes-removebg-preview.svg";
import testCategory from "../../../assets/Category/testing-cate-removebg-preview.svg";

const categoryImageMap: Record<string, string> = {
  camera: CategoryCamera,
  cellphone: CategoryCellPhone,
  computer: CategoryComputer,
  gamepad: CategoryGamepad,
  smartwatch: CategoryWatch,
  headphone: CategoryHeadphone,
  clothes: clothes,
  furniture: furniture,
  luxery: luxery,
  shoes: shoes,
  testing: testCategory,
};

const Categories: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const {
    data: categories = [],
    isLoading,
    isError,
    refetch,
  } = useCategoriesQuery();

  const handleClick = (slug: string) => {
    navigate(`/products?categorySlug=${slug}`);
  };

  const enrichedCategories = categories.map((cat) => {
    const key = (
      cat.slug?.split("-")[0] || cat.name.split(" ")[0]
    ).toLowerCase();
    const localImage = categoryImageMap[key] || DefaultCategoryIcon;
    return { ...cat, image: localImage };
  });

  
  const cardVariants: Variants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction * 100,
      scale: 0.8,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <Box sx={{ mt: 8, pl: isMobile ? 2 : 8, pr: isMobile ? 2 : 8 }}>
      {/* Section header */}
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
          Categories
        </Typography>
      </Box>

      {/* Title & arrows */}
      <Box
        display="flex"
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
            fontSize: isMobile ? "1.5rem" : "2rem",
          }}
        >
          Browse By Category
        </Typography>
        <Box>
          <ArrowNavigation prevClass="cat-prev" nextClass="cat-next" />
        </Box>
      </Box>

      {/* Loading */}
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={200}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {isError && (
        <Box textAlign="center">
          <Typography color="error" mb={2}>
            Failed to load categories
          </Typography>
          <Typography
            onClick={() => refetch()}
            sx={{ cursor: "pointer", color: theme.Button2 }}
          >
            Retry
          </Typography>
        </Box>
      )}

      {/* Swiper & categories */}
      {!isLoading && !isError && (
        <Swiper
          spaceBetween={0}
          navigation={{ nextEl: ".cat-next", prevEl: ".cat-prev" }}
          modules={[Navigation]}
          breakpoints={{
            1200: { slidesPerView: 6 },
            900: { slidesPerView: 4.1 },
            600: { slidesPerView: 3.1 },
            0: { slidesPerView: 1.5 },
          }}
        >
          {enrichedCategories.map((cat, idx) => (
            <SwiperSlide key={cat.id}>
              <motion.div
                custom={idx % 2 === 0 ? -1 : 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <Card
                  onClick={() => handleClick(cat.slug)}
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
                      src={cat.image}
                      alt={cat.name}
                      sx={{ width: 40, mb: 1, transition: "all 0.3s ease" }}
                    />
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                      {cat.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};

export default Categories;
