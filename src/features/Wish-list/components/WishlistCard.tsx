import React, { useState, useRef } from "react";
import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTheme } from "../../../theme/ThemeProvider";
import { useWishlistStore } from "../../../store/wishlistStore";
import { useCartStore } from "../../../store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

interface WishlistCardProps {
  id: number;
  name: string;
  price: number | string;
  oldPrice?: number | string;
  discount?: string;
  images: string[];
  onDelete?: (id: number) => void;
  onFlyToCart?: (image: string, start: DOMRect) => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  id,
  name,
  price,
  oldPrice,
  discount,
  images,
  onDelete,
  onFlyToCart,
}) => {
  const { theme } = useTheme();
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const addToCart = useCartStore((state) => state.addToCart);
  const imageRef = useRef<HTMLImageElement>(null);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      removeFromWishlist(id);
      if (onDelete) onDelete(id);
    }, 600); 
  };

  const handleAddToCart = () => {
    const product = {
      id,
      title: name,
      price: typeof price === "string" ? Number(price) : price,
      oldPrice: oldPrice
        ? typeof oldPrice === "string"
          ? Number(oldPrice)
          : oldPrice
        : undefined,
      discount,
      images,
    };
    addToCart(product, 1);
    removeFromWishlist(id);
    if (onDelete) onDelete(id);

    if (onFlyToCart && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      onFlyToCart(images[0], rect);
    }
  };

  return (
    <AnimatePresence>
      {!isDeleting && (
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 0 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{
            opacity: 0,
            y: 50,
            rotateX: 90,
            scale: 0.3,
            transition: { duration: 0.6, ease: "easeIn" },
          }}
        >
          <Card
            sx={{
              width: 280,
              borderRadius: 2,
              boxShadow: "none",
              border: "1px solid #eee",
              overflow: "hidden",
              position: "relative",
              bgcolor: "#fff",
              perspective: 800, // needed for 3D effect
            }}
          >
            {discount && (
              <Box
                sx={{
                  position: "absolute",
                  top: 15,
                  left: 15,
                  bgcolor: theme.Button2,
                  color: "#fff",
                  px: 1.2,
                  py: 0.3,
                  borderRadius: 1,
                  fontSize: 14,
                  zIndex: 2,
                }}
              >
                {discount}
              </Box>
            )}

            {/* Delete Icon */}
            <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}>
              <motion.div
                whileHover={{ scale: 1.3, rotate: 15 }}
                whileTap={{ scale: 0.9, rotate: -15 }}
              >
                <IconButton
                  onClick={handleDelete}
                  sx={{
                    bgcolor: "white",
                    "&:hover": { bgcolor: theme.Button2, color: "white" },
                    width: 42,
                    height: 42,
                    color: "black",
                  }}
                >
                  <DeleteOutlineIcon fontSize="medium" />
                </IconButton>
              </motion.div>
            </Box>

            {/* Product Image */}
            <Box sx={{ bgcolor: "#f5f5f5", p: 2, textAlign: "center" }}>
              <CardMedia
                ref={imageRef}
                component="img"
                height="180"
                image={images?.[0] || "/placeholder.png"}
                alt={name}
                sx={{ objectFit: "contain", mx: "auto" }}
              />
            </Box>

            {/* Add To Bag Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                fullWidth
                onClick={handleAddToCart}
                sx={{
                  bgcolor: "black",
                  color: "white",
                  fontSize: 16,
                  fontWeight: 500,
                  borderRadius: 0,
                  "&:hover": { bgcolor: "#222" },
                }}
                startIcon={<ShoppingCartOutlinedIcon />}
              >
                Add To Bag
              </Button>
            </motion.div>

            {/* Product Info */}
            <Box sx={{ p: 2 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }} noWrap>
                {name}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  sx={{ fontSize: 16, color: theme.Button2, fontWeight: 600 }}
                >
                  ${typeof price === "number" ? price.toFixed(2) : price}
                </Typography>
                {oldPrice && (
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "gray",
                      textDecoration: "line-through",
                    }}
                  >
                    $
                    {typeof oldPrice === "number"
                      ? oldPrice.toFixed(2)
                      : oldPrice}
                  </Typography>
                )}
              </Box>
            </Box>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WishlistCard;
