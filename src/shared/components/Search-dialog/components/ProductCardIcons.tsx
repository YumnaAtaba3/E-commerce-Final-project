import React from "react";
import { Box, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTheme } from "../../../../theme/ThemeProvider";

interface ProductCardIconsProps {
  isMobile: boolean;
  favorite: boolean;
  toggleWishlist: () => void;
  handleViewDetails: () => void;
  handleAddToCart: () => void;
}

const ProductCardIcons: React.FC<ProductCardIconsProps> = ({
  isMobile,
  favorite,
  toggleWishlist,
  handleViewDetails,
  handleAddToCart,
}) => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        position: isMobile ? "relative" : "absolute",
        top: isMobile ? "auto" : 8,
        right: isMobile ? "auto" : 8,
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        gap: 1,
        mt: isMobile ? 1 : 0,
        zIndex: 10,
      }}
    >
      <IconButton
        onClick={toggleWishlist}
        sx={{
          bgcolor: "white",
          color: favorite ? theme.Button2: "black",
          border: "1px solid transparent",
          "&:hover": {
            bgcolor: theme.Button2,
            color: "white",
            border: "1px solid white",
          },
        }}
      >
        {favorite ? (
          <FavoriteIcon fontSize="small" />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>

      <IconButton
        onClick={handleViewDetails}
        sx={{
          bgcolor: "white",
          border: "1px solid transparent",
          "&:hover": {
            bgcolor: "black",
            color: "white",
            border: "1px solid white",
          },
        }}
      >
        <VisibilityOutlinedIcon fontSize="small" />
      </IconButton>

      <IconButton
        onClick={handleAddToCart}
        sx={{
          bgcolor: "white",
          border: "1px solid transparent",
          "&:hover": {
            bgcolor: theme.Button1,
            color: "white",
            border: "1px solid white",
          },
        }}
      >
        <ShoppingCartOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ProductCardIcons;
