import React from "react";
import { Box, Typography, Rating } from "@mui/material";
import type { Product } from "../../../store/state";
import { useTheme } from "../../../theme/ThemeProvider";
import { motion, type Variants, type Easing } from "framer-motion";

import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";
import QuantityBuyFavorite from "./QuantityBuyFavorite";
import DeliveryReturnCard from "./DeliveryReturnCard";

interface ProductInfoProps {
  product: Product;
  isMobile: boolean;
  isTablet: boolean;
  quantity: number;
  size: string;
  color: string;
  favorite: boolean;
  onQuantityChange: (type: "inc" | "dec") => void;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onFavoriteToggle: () => void;
  sizes: string[];
  colors: string[];
  DeliveryIcon: string;
  ReturnIcon: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  isMobile,
  isTablet,
  quantity,
  size,
  color,
  favorite,
  onQuantityChange,
  onSizeChange,
  onColorChange,
  onFavoriteToggle,
  sizes,
  colors,
  DeliveryIcon,
  ReturnIcon,
}) => {
  const { theme } = useTheme();
  const textAlign = isMobile || isTablet ? "center" : "left";
  const alignItems = isMobile || isTablet ? "center" : "flex-start";
  const justifyContent = isMobile || isTablet ? "center" : "flex-start";
  const containerWidth = isMobile ? "100%" : isTablet ? "80%" : "100%";


  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as Easing, 
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems,
          justifyContent,
          width: containerWidth,
          mx: isTablet ? "auto" : 0,
          px: isMobile ? 2 : 0,
        }}
      >
        {/* Title */}
        <motion.div variants={itemVariants}>
          <Typography
            fontSize={isMobile ? 16 : 24}
            fontWeight={550}
            maxWidth={isMobile ? "100%" : 350}
            mb={1}
            textAlign={textAlign}
            color={theme.Text1}
          >
            {product.title}
          </Typography>
        </motion.div>

        {/* Rating & Stock */}
        <motion.div variants={itemVariants}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={justifyContent}
            gap={1}
            mb={2}
            flexWrap="wrap"
            width="100%"
            textAlign={textAlign}
            color={theme.Text1}
          >
            <Rating
              value={product.rating}
              readOnly
              size={isMobile ? "small" : "medium"}
              sx={{
                color: "gold",
                "& .MuiRating-iconEmpty": {
                  color: theme.Text1 + "55",
                },
              }}
            />
            <Typography fontSize={14} color={theme.Text1}>
              ({Math.floor(Math.random() * 200 + 1)} Reviews)
            </Typography>
            {!isMobile && (
              <>
                <Box
                  sx={{ width: "1px", height: 16, bgcolor: "#ddd", mx: 1 }}
                />
                <Typography
                  fontSize={14}
                  sx={{ color: theme.Button1, fontWeight: 500 }}
                >
                  In Stock
                </Typography>
              </>
            )}
          </Box>
        </motion.div>

        {/* Price */}
        <motion.div variants={itemVariants}>
          <Typography
            fontSize={isMobile ? 24 : 28}
            sx={{ fontWeight: 500, mb: 2, textAlign }}
            color={theme.Text1}
          >
            ${product.price}
          </Typography>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <Typography
            fontSize={isMobile ? 12 : 14}
            color={theme.Text1}
            mb={2}
            maxWidth={isMobile ? "100%" : isTablet ? "100%" : 300}
            textAlign={textAlign}
          >
            {product.description || "No description available."}
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box sx={{ width: "100%", borderBottom: "1px solid #000", mb: 3 }} />
        </motion.div>

        {/* Colors */}
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: "flex",
              justifyContent,
              width: "100%",
            }}
          >
            <ProductColors
              colors={colors}
              selected={color}
              onSelect={onColorChange}
            />
          </Box>
        </motion.div>

        {/* Sizes */}
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: "flex",
              justifyContent,
              width: "100%",
            }}
          >
            <ProductSizes
              sizes={sizes}
              selected={size}
              onSelect={onSizeChange}
            />
          </Box>
        </motion.div>

        {/* Quantity & Favorite */}
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: "flex",
              justifyContent,
              width: "100%",
            }}
          >
            <QuantityBuyFavorite
              product={product}
              quantity={quantity}
              onQuantityChange={onQuantityChange}
              favorite={favorite}
              onFavoriteToggle={onFavoriteToggle}
              isMobile={isMobile}
            />
          </Box>
        </motion.div>

        {/* Delivery & Return */}
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: "flex",
              justifyContent,
              width: "100%",
            }}
          >
            <DeliveryReturnCard
              deliveryIcon={DeliveryIcon}
              returnIcon={ReturnIcon}
              isMobile={isMobile}
            />
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default ProductInfo;
