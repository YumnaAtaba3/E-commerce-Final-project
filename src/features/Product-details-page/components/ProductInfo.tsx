import React from "react";
import { Box, Typography, Rating } from "@mui/material";
import type { Product } from "../../../store/state";
import { useTheme } from "../../../theme/ThemeProvider";

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

  return (
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

      <Typography
        fontSize={isMobile ? 24 : 28}
        sx={{ fontWeight: 500, mb: 2, textAlign }}
        color={theme.Text1}
      >
        ${product.price}
      </Typography>

      <Typography
        fontSize={isMobile ? 12 : 14}
        color={theme.Text1}
        mb={2}
        maxWidth={isMobile ? "100%" : isTablet ? "100%" : 300}
        textAlign={textAlign}
      >
        {product.description || "No description available."}
      </Typography>

      <Box sx={{ width: "100%", borderBottom: "1px solid #000", mb: 3 }} />

      <ProductColors
        colors={colors}
        selected={color}
        onSelect={onColorChange}
      />
      <ProductSizes sizes={sizes} selected={size} onSelect={onSizeChange} />
      <QuantityBuyFavorite
        product={product}
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        favorite={favorite}
        onFavoriteToggle={onFavoriteToggle}
      />
      <DeliveryReturnCard deliveryIcon={DeliveryIcon} returnIcon={ReturnIcon} />
    </Box>
  );
};

export default ProductInfo;
