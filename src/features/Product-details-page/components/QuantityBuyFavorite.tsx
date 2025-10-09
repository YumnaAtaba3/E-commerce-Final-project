import React from "react";
import { Box, Button } from "@mui/material";
import FavoriteButton from "./FavoriteButton";
import Counter from "./Counter";
import { useTheme } from "../../../theme/ThemeProvider";
import { useCartStore } from "../../../store/cartStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appRoutes } from "../../../routes";
import type { Product } from "../../../store/state";

interface Props {
  product: Product;
  quantity: number;
  onQuantityChange: (type: "inc" | "dec") => void;
  favorite: boolean;
  onFavoriteToggle: () => void;
}

const QuantityBuyFavorite: React.FC<Props> = ({
  product,
  quantity,
  onQuantityChange,
  favorite,
  onFavoriteToggle,
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);


  const handleBuyNow = () => {
    if (!product) return;

    addToCart(product, quantity);

    toast.success(`${product.title} added to cart!`, {
      className: "toast-success",
      autoClose: 2000,
    });

    navigate(appRoutes.cart);
  };

 



  const handleFavoriteToggle = () => {
    onFavoriteToggle();

    toast.info(
      favorite
        ? `${product.title} removed from wishlist!`
        : `${product.title} added to wishlist!`,
      { className: "toast-info", autoClose: 2000 }
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      mb={4}
      color={theme.Text1}
      width="100%"
    >
      <Counter quantity={quantity} onChange={onQuantityChange} />

      <Button
        variant="contained"
        sx={{
          bgcolor: "#DB4444",
          px: 5,
          py: 1,
          borderRadius: 1,
          fontSize: 14,
          "&:hover": { bgcolor: "#c73a3a" },
        }}
        onClick={handleBuyNow}
      >
        Buy Now
      </Button>


      <FavoriteButton favorite={favorite} onClick={handleFavoriteToggle} />
    </Box>
  );
};

export default QuantityBuyFavorite;
