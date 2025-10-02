import React from "react";
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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useTheme } from "../../../theme/ThemeProvider";

interface ExploreProductCardProps {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating: number;
  img: string;
  isNew?: boolean;
  colors?: string[];
}

const ExploreProductCard: React.FC<ExploreProductCardProps> = ({
  name,
  price,
  oldPrice,
  rating,
  img,
  isNew,
  colors,
}) => {
  const { theme } = useTheme();

  return (
    <Card
      sx={{
        alignItems: "center",
        width: 280,
        height: 350,
        borderRadius: 2,
        boxShadow: 1,
        overflow: "hidden",
        position: "relative",
        "&:hover .hoverOverlay": { opacity: 1, bottom: 0 },
bgcolor:theme.primary1
      }}
    >
      {/* NEW Badge */}
  
  <Box
           sx={{
             position: "absolute",
             top: 15,
             left: 15,
             bgcolor: theme.Button1,
             color: "#fff",
             px: 1.2,
             py: 0.3,
             borderRadius: 1,
             fontSize: 14,
             zIndex: 2,
           }}
         >
           New
         </Box>


    

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
          sx={{
            bgcolor: "white",
            "&:hover": { bgcolor: theme.Button2, color: "white" },
            width: 42,
            height: 42,
          }}
        >
          <FavoriteBorderIcon fontSize="large" />
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

      {/* Product Image */}
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

        {/* Add To Cart Overlay */}
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
          >
            Add To Cart
          </Button>
        </Box>
      </Box>

      {/* Product Info */}
      <CardContent sx={{ bgcolor: theme.primary1,color:theme.Text1, textAlign: "left" }}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }} noWrap>
          {name}
        </Typography>

        {/* Price */}
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

        {/* Rating */}
        {rating && (
          <Box display="flex" alignItems="center" gap={1}>
            <Rating value={rating} precision={0.5} readOnly size="large" />
            <Typography sx={{ fontSize: 14, color: "gray" }}>
              ({rating})
            </Typography>
          </Box>
        )}

        {/* Colors */}
        {colors && colors.length > 0 && (
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {colors.map((color, i) => (
              <Box
                key={i}
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  bgcolor: color,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ExploreProductCard;
