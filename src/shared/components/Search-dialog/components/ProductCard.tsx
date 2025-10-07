/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Rating,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTheme } from "../../../../theme/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../../../store/wishlistStore";

interface SearchProductCardProps {
  product: any;
}

const SearchProductCard: React.FC<SearchProductCardProps> = ({ product }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  // <-- Correct subscription to store for re-render
  const favorite = useWishlistStore((state) => state.isInWishlist(product.id));

  const toggleWishlist = () => {
    if (favorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/backup.png";

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
            {product.price}
          </Typography>
          <Rating
            value={product.rating || 0}
            precision={0.5}
            readOnly
            size="small"
          />
        </Box>

        {/* Mobile icons under rating */}
        {isMobile && (
          <Box display="flex" gap={1} mt={1}>
            <IconButton
              onClick={toggleWishlist}
              sx={{
                bgcolor: theme.primary1,
                color: favorite ? theme.Button2 : "black",
                "&:hover": { bgcolor: theme.Button2, color: "white" },
              }}
            >
              {favorite ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>

            <IconButton
              onClick={() =>
                product.slug && navigate(`/products/${product.slug}`)
              }
              sx={{
                bgcolor: theme.primary1,
                "&:hover": { bgcolor: theme.Button2, color: "white" },
              }}
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>

            <IconButton
              sx={{
                bgcolor: theme.primary1,
                "&:hover": { bgcolor: theme.Button2, color: "white" },
              }}
            >
              <ShoppingCartOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* Desktop icons */}
        {!isMobile && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <IconButton
              onClick={toggleWishlist}
              sx={{
                bgcolor: theme.primary1,
                color: favorite ? theme.Button2 : "black",
                "&:hover": { bgcolor: theme.Button2, color: "white" },
              }}
            >
              {favorite ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton
              onClick={() =>
                product.slug && navigate(`/products/${product.slug}`)
              }
              sx={{
                bgcolor: theme.primary1,
                "&:hover": { bgcolor: theme.Button2, color: "white" },
              }}
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: theme.primary1,
                "&:hover": { bgcolor: theme.Button2, color: "white" },
              }}
            >
              <ShoppingCartOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchProductCard;
