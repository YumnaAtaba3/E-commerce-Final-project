/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import FavoriteButton from "./FavoriteButton";
import Counter from "./Counter";
import { useTheme } from "../../../theme/ThemeProvider";
import { useCartStore } from "../../../store/cartStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { appRoutes } from "../../../routes";
import { motion, AnimatePresence } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Product } from "../../../store/state";

interface Props {
  product: Product;
  quantity: number;
  onQuantityChange: (type: "inc" | "dec") => void;
  favorite: boolean;
  onFavoriteToggle: () => void;
  isMobile:boolean
}

const QuantityBuyFavorite: React.FC<Props> = ({
  product,
  quantity,
  onQuantityChange,
  favorite,
  onFavoriteToggle,
  isMobile
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  // Floating hearts
  const [hearts, setHearts] = useState<
    { id: number; x: number; delay: number }[]
  >([]);

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

    // Trigger floating hearts when adding to wishlist
    if (!favorite) {
      const newHearts = Array.from({ length: 10 }).map(() => ({
        id: Date.now() + Math.random(),
        x: Math.random() * 100 - 30,
        delay: Math.random() * 0.3,
      }));
      setHearts((prev) => [...prev, ...newHearts]);
    }
  };

  return (
    <Box
      display="flex"
      alignItems={isMobile?"flex-start":"center"}
      gap={isMobile?0.5:2}
      mb={4}
      color={theme.Text1}
      width="100%"
      position="relative"
    >
      <Counter quantity={quantity} onChange={onQuantityChange} isMobile={isMobile} />

      <Button
        variant="contained"
        sx={{
          bgcolor: "#DB4444",
          px: isMobile?2:5,
          py: 1,
          borderRadius: 1,
          fontSize: 14,
          "&:hover": { bgcolor: "#c73a3a" },
        }}
        onClick={handleBuyNow}
      >
        Buy Now
      </Button>

      <Box position="relative">
        <FavoriteButton favorite={favorite} onClick={handleFavoriteToggle} />

        {/* Floating Hearts Animation */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, scale: 1, y: 0, x: heart.x }}
              animate={{ opacity: 0, scale: 1.5, y: -150 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: heart.delay,
              }}
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                pointerEvents: "none",
              }}
              onAnimationComplete={() =>
                setHearts((prev) => prev.filter((h) => h.id !== heart.id))
              }
            >
              <FavoriteIcon sx={{ color: theme.Button2, fontSize: isMobile?20:28 }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default QuantityBuyFavorite;
