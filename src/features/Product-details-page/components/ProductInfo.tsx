import React from "react";
import { Box, Typography, Rating } from "@mui/material";
import type { Product } from "../../../store/state";
import { useTheme } from "../../../theme/ThemeProvider";
import { motion } from "framer-motion";

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
  const textAlign = isMobile ? "center" : isTablet ? "center" : "left";
  const containerAlign = isMobile
    ? "center"
    : isTablet
    ? "center"
    : "flex-start";
  const containerWidth = isMobile ? "100%" : isTablet ? "80%" : "100%";

  // Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // stagger each child by 0.15s
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: containerAlign,
          width: containerWidth,
          mx: isTablet ? "auto" : 0,
          pl: isMobile ? 2 : 0,
        }}
      >
        {/* Title */}
        <motion.div variants={itemVariants}>
          <Typography
            fontSize={isMobile ? 20 : 24}
            fontWeight={550}
            maxWidth={350}
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
            gap={1}
            mb={2}
            flexWrap="wrap"
            justifyContent={containerAlign}
            color={theme.Text1}
          >
            <Rating
              value={product.rating}
              readOnly
              size="medium"
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
            <Box sx={{ width: "1px", height: 16, bgcolor: "#ddd", mx: 1 }} />
            <Typography
              fontSize={14}
              sx={{ color: theme.Button1, fontWeight: 500 }}
            >
              In Stock
            </Typography>
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
          <ProductColors
            colors={colors}
            selected={color}
            onSelect={onColorChange}
          />
        </motion.div>

        {/* Sizes */}
        <motion.div variants={itemVariants}>
          <ProductSizes sizes={sizes} selected={size} onSelect={onSizeChange} />
        </motion.div>

        {/* Quantity & Favorite */}
        <motion.div variants={itemVariants}>
          <QuantityBuyFavorite
            product={product}
            quantity={quantity}
            onQuantityChange={onQuantityChange}
            favorite={favorite}
            onFavoriteToggle={onFavoriteToggle}
          />
        </motion.div>

        {/* Delivery & Return */}
        <motion.div variants={itemVariants}>
          <DeliveryReturnCard
            deliveryIcon={DeliveryIcon}
            returnIcon={ReturnIcon}
          />
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default ProductInfo;
