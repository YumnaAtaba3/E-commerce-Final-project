/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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
import { useIsLoggedIn } from "../../../../features/auth/hooks/is-logged-in";
import { appRoutes } from "../../../../routes";
import { toast } from "react-toastify";
import ProductCardIcons from "./ProductCardIcons";

interface SearchProductCardProps {
  product: any;
}

const SearchProductCard: React.FC<SearchProductCardProps> = ({ product }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const setSearchOpen = useSearchStore((state) => state.setOpen);
  const { isLoggedIn } = useIsLoggedIn();

  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const favorite = useWishlistStore((state) => state.isInWishlist(product.id));
  const addToCart = useCartStore((state) => state.addToCart);

  const productImage = product.images?.[0] || "/backup.png";

  const toggleWishlist = () => {
    if (!isLoggedIn) {
      setSearchOpen(false);
      navigate(appRoutes.auth.signUp);
      return;
    }
    if (favorite) {
      removeFromWishlist(product.id);
      toast.info(`${product.title} removed from wishlist!`, {
        className: "toast-info",
        autoClose: 1500,
      });
    } else {
      addToWishlist(product);
      toast.info(`${product.title} added to wishlist!`, {
        className: "toast-info",
        autoClose: 1500,
      });
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setSearchOpen(false);
      navigate(appRoutes.auth.signUp);
      return;
    }
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        images: product.images || [productImage],
        oldPrice: undefined,
        discount: ""
      },
      1
    );
    toast.success(`${product.title} added to cart!`, {
      className: "toast-success",
      autoClose: 1500,
    });
  };

  const handleViewDetails = () => {
    if (!isLoggedIn) {
      setSearchOpen(false);
      navigate(appRoutes.auth.signUp);
      return;
    }
    setSearchOpen(false);
    navigate(appRoutes.products.details(product.id));
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: isMobile ? "center" : "stretch",
        gap: 2,
        borderRadius: 6,
        bgcolor: theme.primary1,
        boxShadow: "none",
        border: `1px solid ${theme.borderColor}`,
        p: isMobile ? 1 : 0,
        position: "relative",
        "&:hover": {
          bgcolor: theme.Button2,
          transform: "translateY(-4px)",
          "& .MuiTypography-subtitle1": { color: "white" },
          "& .MuiTypography-root": { color: "white" },
        },
      }}
    >
      <CardMedia
        component="img"
        image={productImage}
        alt={product.title}
        sx={{
          width: isMobile ? 100 : "100%",
          height: 160,
          objectFit: "contain",
          bgcolor: "#f5f5f5",
          borderRadius: 2,
        }}
      />

      <CardContent sx={{ flex: 1, p: 2 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            color: theme.Text1,
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.title}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            sx={{ color: theme.Button2, fontWeight: 600, fontSize: 16 }}
          >
            ${product.price}
          </Typography>
          <Rating
            value={product.rating || 0}
            precision={0.5}
            readOnly
            size="small"
          />
        </Box>

        {/* Mobile icons */}
        {isMobile && (
          <ProductCardIcons
            isMobile
            favorite={favorite}
            toggleWishlist={toggleWishlist}
            handleViewDetails={handleViewDetails}
            handleAddToCart={handleAddToCart}
          />
        )}
      </CardContent>

      {/* Desktop icons */}
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
  );
};

export default SearchProductCard;
