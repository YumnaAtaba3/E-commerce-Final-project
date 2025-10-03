import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTheme } from "../../theme/ThemeProvider";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  img: string;
  isNew?: boolean; // 🔹 added
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
}) => {
  const { theme } = useTheme();
  const [favorite, setFavorite] = useState(false);

  return (
    <Card
      sx={{
        alignItems: "center",
        width: 280,
        height: 350,
        borderRadius: 2,
        boxShadow: "none",
        border: "none !important",
        outline: "none",
        overflow: "hidden",
        position: "relative",
        "&:hover .hoverOverlay": { opacity: 1, bottom: 0 },
        bgcolor: theme.primary1,
      }}
    >
      {/* 🔹 Badge logic (Discount first, else New) */}
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
          onClick={() => setFavorite(!favorite)}
          sx={{
            bgcolor: "white",
            "&:hover": { bgcolor: theme.Button2, color: "white" },
            width: 42,
            height: 42,
            color: favorite ? theme.Button2 : "black",
          }}
        >
          {favorite ? (
            <FavoriteIcon fontSize="large" />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
        </IconButton>
        <IconButton
          sx={{
            bgcolor: "white",
            "&:hover": { bgcolor: theme.Button2, color: "white" },
            width: 42,
            height: 42,
          }}
        >
          <VisibilityOutlinedIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box
        sx={{
          bgcolor: "#f5f5f5",
          p: 2,
          textAlign: "center",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={img}
          alt={name}
          sx={{ objectFit: "contain", mx: "auto" }}
        />
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
              bgcolor: "black",
              color: "white",
              fontSize: 16,
              fontWeight: 500,
              "&:hover": { bgcolor: "#222" },
            }}
            startIcon={<ShoppingCartOutlinedIcon />}
          >
            Add To Cart
          </Button>
        </Box>
      </Box>

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
            {price}
          </Typography>
          {oldPrice && (
            <Typography
              sx={{
                fontSize: 14,
                color: "gray",
                textDecoration: "line-through",
              }}
            >
              {oldPrice}
            </Typography>
          )}
        </Box>
        {rating && (
          <Box display="flex" alignItems="center" gap={1}>
            <Rating value={rating} precision={0.5} readOnly size="large" />
            <Typography sx={{ fontSize: 14, color: "gray" }}>
              ({rating})
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
