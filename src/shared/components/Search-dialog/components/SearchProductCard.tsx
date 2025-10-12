import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useTheme } from "../../../../theme/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../../../store/wishlistStore";
import { useCartStore } from "../../../../store/cartStore";
import { useSearchStore } from "../../../../store/searchStore";
import { appRoutes } from "../../../../routes";
import { toast } from "react-toastify";
import ProductCardIcons from "./ProductCardIcons";
import { motion, AnimatePresence } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { Product } from "../../../../store/state";

interface SearchProductCardProps {
  product: Product;
}

const SearchProductCard: React.FC<SearchProductCardProps> = ({ product }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const setSearchOpen = useSearchStore((state) => state.setOpen);

  // Stores
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const favorite = useWishlistStore((state) => state.isInWishlist(product.id));
  const addToCart = useCartStore((state) => state.addToCart);

  const productImage = product.images?.[0] || "/backup.png";

  const [hearts, setHearts] = useState<
    { id: number; x: number; delay: number }[]
  >([]);
  const [cartBursts, setCartBursts] = useState<
    { id: number; x: number; delay: number }[]
  >([]);

  const toggleWishlist = () => {
    if (favorite) {
      removeFromWishlist(product.id);
      toast.info(`${product.title} removed from wishlist!`, {
        autoClose: 1200,
      });
    } else {
      addToWishlist(product);
      toast.success(`${product.title} added to wishlist!`, { autoClose: 1200 });

      const newHearts = Array.from({ length: 30 }).map(() => ({
        id: Date.now() + Math.random(),
        x: Math.random() * 400 - 60,
        delay: Math.random() * 0.3,
      }));
      setHearts((prev) => [...prev, ...newHearts]);
    }
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        images: product.images || [productImage],
        oldPrice: product.oldPrice,
        discount: product.discount || "",
      },
      1
    );
    toast.success(`${product.title} added to cart!`, { autoClose: 1200 });

    const newCarts = Array.from({ length: 30 }).map(() => ({
      id: Date.now() + Math.random(),
      x: Math.random() * 400 - 60,
      delay: Math.random() * 0.2,
    }));
    setCartBursts((prev) => [...prev, ...newCarts]);
  };

  const handleViewDetails = () => {
    setSearchOpen(false);
    navigate(appRoutes.products.details(product.id));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.25 }}
      style={{ display: "inline-block", width: isMobile ? "100%" : 250 }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 4,
          bgcolor: theme.primary1,
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          border: `1px solid ${theme.borderColor}`,
          p: isMobile ? 0.8 : 1.2,
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 20px rgba(219,68,68,0.25)",
            borderColor: theme.Button2,
            "& .product-title": { color: theme.Button2 },
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={productImage}
            alt={product.title}
            sx={{
              width: isMobile ? 70 : "100%",
              height: isMobile ? 70 : 160,
              objectFit: "contain",
              bgcolor: "#fafafa",
              borderRadius: 2,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />

          {/* ❤️ Floating Hearts */}
          <AnimatePresence>
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 1, scale: 1, y: 0, x: heart.x }}
                animate={{ opacity: 0, scale: 1.5, y: -100 }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: heart.delay,
                }}
                style={{
                  position: "absolute",
                  bottom: 30,
                  left: "50%",
                  pointerEvents: "none",
                }}
                onAnimationComplete={() =>
                  setHearts((prev) => prev.filter((h) => h.id !== heart.id))
                }
              >
                <FavoriteIcon sx={{ color: theme.Button2, fontSize: 20 }} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* 🛒 Floating Carts */}
          <AnimatePresence>
            {cartBursts.map((cart) => (
              <motion.div
                key={cart.id}
                initial={{ opacity: 1, scale: 0.7, y: 0, x: cart.x }}
                animate={{
                  opacity: 0,
                  scale: 1.2,
                  y: -100,
                  rotate: Math.random() * 60 - 30,
                }}
                transition={{
                  duration: 1.1,
                  ease: "easeOut",
                  delay: cart.delay,
                }}
                style={{
                  position: "absolute",
                  bottom: 25,
                  left: "50%",
                  pointerEvents: "none",
                }}
                onAnimationComplete={() =>
                  setCartBursts((prev) => prev.filter((c) => c.id !== cart.id))
                }
              >
                <ShoppingCartIcon sx={{ color: theme.Button1, fontSize: 20 }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        <CardContent
          sx={{
            flex: 1,
            p: isMobile ? "4px 6px" : 2,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Typography
            className="product-title"
            variant="subtitle2"
            fontWeight={600}
            sx={{
              color: theme.Text1,
              mb: 0.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: isMobile ? "0.8rem" : "1rem",
              maxWidth: isMobile ? 140 : "100%",
            }}
          >
            {product.title}
          </Typography>

          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography
              sx={{
                color: theme.Button2,
                fontWeight: 700,
                fontSize: isMobile ? "0.8rem" : "1rem",
              }}
            >
              ${product.price}
            </Typography>
            <Rating
              value={product.rating || 0}
              precision={0.5}
              readOnly
              size={isMobile ? "small" : "medium"}
            />
          </Box>

          {isMobile && (
            <Box mt={0.5}>
              <ProductCardIcons
                isMobile
                favorite={favorite}
                toggleWishlist={toggleWishlist}
                handleViewDetails={handleViewDetails}
                handleAddToCart={handleAddToCart}
              />
            </Box>
          )}
        </CardContent>

        {!isMobile && (
          <ProductCardIcons
            isMobile={false}
            favorite={favorite}
            toggleWishlist={toggleWishlist}
            handleViewDetails={handleViewDetails}
            handleAddToCart={handleAddToCart}
          />
        )}
      </Card>
    </motion.div>
  );
};

export default SearchProductCard;
