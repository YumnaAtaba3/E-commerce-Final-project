/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";
import WishlistCard from "./components/WishlistCard";
import ProductCard from "../../shared/components/Product-card";
import WishlistSkeletonCard from "./components/WishlistSkeletonCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ErrorState from "../../shared/components/Error-state";
import { useWishlistPage } from "./hooks/useWishlistPage";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Animated count for wishlist
const AnimatedCount: React.FC<{
  count: number;
  color?: string;
  fontSize?: number;
}> = ({ count, color = "inherit", fontSize = 18 }) => {
  const [prevCount, setPrevCount] = useState(count);

  useEffect(() => {
    setPrevCount(count);
  }, [count]);

  return (
    <Box sx={{ display: "inline-block", position: "relative", minWidth: 10 }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={count}
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          style={{
            display: "inline-block",
            color,
            fontWeight: 600,
            fontSize,
          }}
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </Box>
  );
};

const WishlistPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

  const {
    wishlist,
    justForYou,
    isLoading,
    isError,
    refetch,
    handleDelete,
    handleViewAll,
    moveAllToBag,
  } = useWishlistPage();

  const buttonStyle = {
    borderColor: theme.Text1,
    color: theme.Text1,
    bgcolor: theme.primary1,
    px: isMobile ? 2 : isTablet ? 3 : 5,
    py: isMobile ? 0.8 : 1.2,
    borderRadius: 0,
    fontSize: isMobile ? 12 : isTablet ? 13 : 14,
    fontWeight: 500,
    textTransform: "none" as const,
    boxShadow: "none",
    transition: "0.2s",
    "&:hover": {
      bgcolor: theme.Button2,
      color: "white",
      borderColor: theme.Button2,
      transform: "scale(1.05)",
    },
  };

  const headingFont = isMobile ? 18 : isTablet ? 22 : 24;

  // ✅ Typed and fixed Framer Motion variants
  const cardVariants: Variants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 120 },
    },
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 4,
        bgcolor: theme.primary1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        {/* Header */}
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          mb={3}
          gap={isMobile ? 2 : 0}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
              color: theme.Text1,
              fontSize: headingFont,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Wishlist (
            <AnimatedCount
              count={wishlist.length}
              color={theme.Button2}
              fontSize={headingFont}
            />
            )
          </Typography>
          {wishlist.length > 0 && (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outlined"
                sx={buttonStyle}
                onClick={moveAllToBag}
              >
                Move All To Bag
              </Button>
            </motion.div>
          )}
        </Box>

        {/* Wishlist Grid */}
        {wishlist.length > 0 ? (
          <Grid
            container
            spacing={isMobile ? 2 : 3}
            mb={6}
            justifyContent={isMobile ? "center" : "flex-start"}
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <Grid key={idx}>
                    <WishlistSkeletonCard />
                  </Grid>
                ))
              : wishlist.map((item, idx) => (
                  <Grid key={item.id}>
                    <motion.div
                      initial={idx % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
                      animate="visible"
                      variants={cardVariants}
                    >
                      <WishlistCard
                        id={item.id}
                        name={item.title || "Unnamed Product"}
                        price={item.price}
                        oldPrice={item.oldPrice}
                        discount={item.discount}
                        images={
                          item.images?.length
                            ? item.images
                            : [item.img || "/placeholder.png"]
                        }
                        onDelete={handleDelete}
                      />
                    </motion.div>
                  </Grid>
                ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 6, color: theme.Text1 }}>
            <Typography variant="h6" sx={{ fontWeight: 400, fontSize: 18 }}>
              Your wishlist is empty 🛒
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: theme.secound1 }}>
              Start adding items you love!
            </Typography>
          </Box>
        )}

        {/* Just For You */}
        <Box>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            justifyContent="space-between"
            alignItems={isMobile ? "flex-start" : "center"}
            mb={2}
            gap={isMobile ? 1 : 0}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <Box
                sx={{
                  width: 20,
                  height: 40,
                  bgcolor: theme.Button2,
                  borderRadius: 1,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 300,
                  color: theme.Text1,
                  fontSize: headingFont,
                }}
              >
                Just For You
              </Typography>
            </Box>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outlined"
                sx={buttonStyle}
                onClick={handleViewAll}
              >
                View All
              </Button>
            </motion.div>
          </Box>

          {isLoading ? (
            <Grid container spacing={2}>
              {Array.from({ length: 4 }).map((_, idx) => (
                <Grid key={idx}>
                  <WishlistSkeletonCard />
                </Grid>
              ))}
            </Grid>
          ) : isError ? (
            <ErrorState
              title="Failed to load products."
              description="Try again."
              onRetry={refetch}
            />
          ) : (
            <Swiper
              spaceBetween={10}
              slidesPerView={isMobile ? 1.1 : 4.1}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[Navigation]}
            >
              {justForYou.map((product, idx) => (
                <SwiperSlide key={product.id}>
                  <motion.div
                    initial={idx % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
                    animate="visible"
                    variants={cardVariants}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                  >
                    <ProductCard
                      id={product.id}
                      name={product.title}
                      price={`$${Number(product.price).toFixed(2)}`}
                      oldPrice={
                        product.oldPrice
                          ? `${
                              typeof product.oldPrice === "number"
                                ? product.oldPrice.toFixed(2)
                                : product.oldPrice
                            }`
                          : undefined
                      }
                      discount={product.discount}
                      rating={product.rating}
                      img={product.images?.[0] || "/placeholder.png"}
                      isNew={product.isNew}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WishlistPage;
