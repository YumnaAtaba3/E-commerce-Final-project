import React from "react";
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

interface WishlistCardProps {
  id: number;
  name: string;
  price: number | string;
  oldPrice?: string;
  discount?: string;
  images: string[];
  onDelete?: (id: number) => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  id,
  name,
  price,
  oldPrice,
  discount,
  images,
  onDelete,
}) => {
  const { theme } = useTheme();
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const handleDelete = () => {
    removeFromWishlist(id);
    if (onDelete) onDelete(id);
  };

  return (
    <Card
      sx={{
        width: 280,
        borderRadius: 2,
        boxShadow: "none",
        border: "1px solid #eee",
        overflow: "hidden",
        position: "relative",
        bgcolor: "#fff",
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

      <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}>
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
          <DeleteOutlineIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box sx={{ bgcolor: "#f5f5f5", p: 2, textAlign: "center" }}>
        <CardMedia
          component="img"
          height="180"
          image={images?.[0] || "/placeholder.png"} 
          alt={name}
          sx={{ objectFit: "contain", mx: "auto" }}
        />
      </Box>

      <Button
        fullWidth
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

      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }} noWrap>
          {name}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            sx={{ fontSize: 16, color: theme.Button2, fontWeight: 600 }}
          >
            ${price}
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
      </Box>
    </Card>
  );
};

export default WishlistCard;
