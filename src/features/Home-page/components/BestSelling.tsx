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
import { motion } from "framer-motion";

import ProductCard from "../../../shared/components/Product-card";
import { useTheme } from "../../../theme/ThemeProvider";
import { useProductsState } from "../../../store/productStore";
import { appRoutes } from "../../../routes";

const MotionButton = motion(Button);

const BestSelling: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const { products } = useProductsState();
  const navigate = useNavigate();

  const bestProducts = products.slice(0, 8);

  return (
    <Box sx={{ mt: 8, pl: isMobile ? 1 : 8, pr: isMobile ? 1 : 8 }}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Box
            sx={{
              width: 20,
              height: 40,
              bgcolor: theme.Button2,
              borderRadius: 1,
            }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: theme.Button2 }}
          >
            This Month
          </Typography>
        </Box>
      </motion.div>

      {/* Title + Desktop Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
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
              fontSize: isMobile ? "1.5rem" : "2rem",
            }}
          >
            Best Selling Products
          </Typography>
          {!isMobile && (
            <MotionButton
              variant="contained"
              onClick={() => navigate(appRoutes.products.list)}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: 14,
                textTransform: "none",
                bgcolor: theme.Button2,
                "&:hover": { bgcolor: "#cc0000" },
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              View All
            </MotionButton>
          )}
        </Box>
      </motion.div>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={0}
        slidesPerView={isMobile ? 1.1 : 4.1}
        navigation={{ nextEl: ".best-next", prevEl: ".best-prev" }}
        modules={[Navigation]}
      >
        {bestProducts.map((p, idx) => (
          <SwiperSlide key={p.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <ProductCard
                id={p.id}
                name={p.title}
                price={`$${p.price}`}
                discount={p.discount}
                rating={p.rating}
                img={p.images?.[0]}
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile Button */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Box textAlign="center" mt={2}>
            <MotionButton
              variant="contained"
              onClick={() => navigate(appRoutes.products.list)}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: 14,
                textTransform: "none",
                bgcolor: theme.Button2,
                "&:hover": { bgcolor: "#cc0000" },
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              View All
            </MotionButton>
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

export default BestSelling;
