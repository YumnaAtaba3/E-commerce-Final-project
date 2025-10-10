/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Rating,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigate } from "react-router";
import { useWishlistStore } from "../../../store/wishlistStore";
import { useCartStore } from "../../../store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "../../../store/state";
import { appRoutes } from "../../../routes";
import { useOutletContext } from "react-router";
import type { HeaderProtectedIconsHandle } from "../../layouts/Header/components/HeaderProtectedIcons";

interface ProductCardProps {
  id: number;
  name: string;
  price: number | string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  img: string | string[];
  isNew?: boolean;
  colors?: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  oldPrice,
  discount,
  rating,
  img,
  isNew,
  colors,
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { cartRef } = useOutletContext<{
    cartRef: React.RefObject<HeaderProtectedIconsHandle>;
  }>();

  // Wishlist
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const favorite = useWishlistStore((state) => state.isInWishlist(id));

  // Cart
  const addToCart = useCartStore((state) => state.addToCart);
  const inCart = useCartStore((state) => state.isInCart(id));

  // Floating hearts
  const [hearts, setHearts] = useState<
    { id: number; x: number; delay: number }[]
  >([]);

  // Safe numeric price
  const numericPrice = (() => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      const parsed = parseFloat(price.replace(/[^0-9.]/g, ""));
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  })();

  let finalPrice = numericPrice;
  let finalOldPrice = oldPrice;

  if (discount) {
    const discountNum = parseInt(discount.replace(/[^0-9]/g, ""));
    if (!isNaN(discountNum)) {
      finalOldPrice = `$${numericPrice.toFixed(2)}`;
      finalPrice = numericPrice * (1 - discountNum / 100);
    }
  }

  const displayPrice = `$${finalPrice.toFixed(2)}`;
  const displayOldPrice =
    finalOldPrice && finalOldPrice !== displayPrice ? finalOldPrice : undefined;
  const imageToShow = Array.isArray(img) ? img[0] : img;

  // Wishlist toggle
  const toggleWishlist = () => {
    favorite
      ? removeFromWishlist(id)
      : addToWishlist({
          id,
          title: name,
          price: numericPrice,
          oldPrice: finalOldPrice,
          discount,
          images: [imageToShow],
          rating,
          colors,
          isNew,
        } as Product);

    if (!favorite) {
      const newHearts = Array.from({ length: 5 }).map(() => ({
        id: Date.now() + Math.random(),
        x: Math.random() * 60 - 30,
        delay: Math.random() * 0.3,
      }));
      setHearts((prev) => [...prev, ...newHearts]);
    }
  };

  // Fly-to-cart animation
  const handleAddToCart = () => {
    if (!inCart) {
      addToCart(
        {
          id,
          title: name,
          price: numericPrice,
          oldPrice: finalOldPrice,
          discount,
          images: [imageToShow],
          rating,
          colors,
          isNew,
        } as Product,
        1
      );

      if (cartRef?.current?.cartIconRef?.current) {
        const cartIcon = cartRef.current.cartIconRef.current;
        const productImage = document.getElementById(`product-img-${id}`);
        if (productImage) {
          const imgRect = productImage.getBoundingClientRect();
          const cartRect = cartIcon.getBoundingClientRect();

          const flyingImg = productImage.cloneNode(true) as HTMLElement;
          flyingImg.style.position = "fixed";
          flyingImg.style.left = `${imgRect.left}px`;
          flyingImg.style.top = `${imgRect.top}px`;
          flyingImg.style.width = `${imgRect.width}px`;
          flyingImg.style.height = `${imgRect.height}px`;
          flyingImg.style.zIndex = "1000";
          flyingImg.style.pointerEvents = "none";
          flyingImg.style.borderRadius = "8px";
          document.body.appendChild(flyingImg);

          flyingImg.animate(
            [
              { transform: `translate(0, 0) scale(1)` },
              {
                transform: `translate(${cartRect.left - imgRect.left}px, ${
                  cartRect.top - imgRect.top
                }px) scale(0.2)`,
                opacity: 0.5,
              },
            ],
            { duration: 800, easing: "ease-in-out" }
          ).onfinish = () => flyingImg.remove();
        }
      }
    }
  };

  const handleViewDetails = () => navigate(appRoutes.products.details(id));

  return (
    <Card
      sx={{
        alignItems: "center",
        width: 280,
        height: 350,
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        "&:hover .hoverOverlay": { opacity: 1, bottom: 0 },
        bgcolor: theme.primary1,
        mt: 5,
        boxShadow: "none",
        border: "none !important",
        outline: "none",
      }}
    >
      {/* Top Badges */}
      {(discount || isNew) && (
        <Box
          sx={{
            position: "absolute",
            top: 15,
            left: 15,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            zIndex: 2,
          }}
        >
          {discount && (
            <Box
              sx={{
                bgcolor: theme.Button2,
                color: "#fff",
                px: 1.2,
                py: 0.3,
                borderRadius: 1,
                fontSize: 14,
              }}
            >
              {discount}
            </Box>
          )}
          {isNew && (
            <Box
              sx={{
                bgcolor: theme.Button1,
                color: "#fff",
                px: 1.2,
                py: 0.3,
                borderRadius: 1,
                fontSize: 14,
              }}
            >
              New
            </Box>
          )}
        </Box>
      )}

      {/* Icons */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          zIndex: 2,
        }}
      >
        <IconButton
          onClick={toggleWishlist}
          sx={{
            bgcolor: "white",
            "&:hover": { bgcolor: theme.Button2, color: "white" },
            width: 42,
            height: 42,
            color: favorite ? theme.Button2 : "black",
          }}
        >
          {favorite ? (
            <FavoriteIcon fontSize="medium" />
          ) : (
            <FavoriteBorderIcon fontSize="medium" />
          )}
        </IconButton>

        <IconButton
          onClick={handleViewDetails}
          sx={{
            bgcolor: "white",
            "&:hover": { bgcolor: theme.Button2, color: "white" },
            width: 42,
            height: 42,
          }}
        >
          <VisibilityOutlinedIcon fontSize="medium" />
        </IconButton>
      </Box>

      {/* Image */}
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          p: 2,
          textAlign: "center",
          position: "relative",
        }}
      >
        <CardMedia
          id={`product-img-${id}`}
          component="img"
          height="180"
          image={imageToShow}
          alt={name}
          sx={{ objectFit: "contain", mx: "auto" }}
        />

        {/* Hover Add to Cart */}
        <Box
          className="hoverOverlay"
          sx={{
            position: "absolute",
            bottom: "-100%",
            left: 0,
            width: "100%",
            bgcolor: "black",
            color: "#fff",
            py: 1,
            textAlign: "center",
            transition: "all 0.3s ease",
          }}
        >
          <Button
            fullWidth
            sx={{
              bgcolor: inCart ? "gray" : "black",
              color: "white",
              fontSize: 16,
              fontWeight: 500,
              "&:hover": { bgcolor: inCart ? "#222" : "#222" },
            }}
            startIcon={<ShoppingCartOutlinedIcon />}
            onClick={handleAddToCart}
          >
            {inCart ? "In Cart" : "Add To Cart"}
          </Button>
        </Box>

        {/* Floating Hearts */}
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
                bottom: 50,
                left: "50%",
                pointerEvents: "none",
              }}
              onAnimationComplete={() =>
                setHearts((prev) => prev.filter((h) => h.id !== heart.id))
              }
            >
              <FavoriteIcon sx={{ color: theme.Button2, fontSize: 28 }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {/* Content */}
      <CardContent
        sx={{ bgcolor: theme.primary1, color: theme.Text1, textAlign: "left" }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }} noWrap>
          {name}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Typography
            sx={{ fontSize: 16, color: theme.Button2, fontWeight: 600 }}
          >
            {displayPrice}
          </Typography>
          {displayOldPrice && (
            <Typography
              sx={{
                fontSize: 14,
                color: "gray",
                textDecoration: "line-through",
              }}
            >
              {displayOldPrice}
            </Typography>
          )}
          {colors && rating !== undefined && (
            <Box display="flex" alignItems="center" gap={0.5} ml="auto">
              <Rating value={rating} precision={0.5} readOnly size="small" />
              <Typography sx={{ fontSize: 14, color: "gray" }}>
                ({rating})
              </Typography>
            </Box>
          )}
        </Box>

        {!colors && rating !== undefined && (
          <Box display="flex" alignItems="center" gap={0.5} mb={1}>
            <Rating value={rating} precision={0.5} readOnly size="small" />
            <Typography sx={{ fontSize: 14, color: "gray" }}>
              ({rating})
            </Typography>
          </Box>
        )}

        {colors && colors.length > 0 && (
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {colors.map((color, i) => (
              <Box
                key={i}
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  bgcolor: color,
                  cursor: "pointer",
                  border: `1px solid ${theme.Text1}`,
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
