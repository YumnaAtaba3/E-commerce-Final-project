import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import WishlistCard from "./components/WishlistCard";
import ProductCard from "../../shared/components/ProductCard"; // reuse Related design
import { useTheme } from "../../theme/ThemeProvider";

const WishlistPage: React.FC = () => {
  const { theme } = useTheme();

  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Gucci duffle bag",
      price: "$960",
      oldPrice: "$1160",
      discount: "-35%",
      img: "/bag.png",
      
    },
    {
      id: 2,
      name: "RGB liquid CPU Cooler",
      price: "$1960",
      img: "/cooler.png",
    },
    {
      id: 3,
      name: "GP11 Shooter USB Gamepad",
      price: "$550",
      img: "/gamepad.png",
    },
    {
      id: 4,
      name: "Quilted Satin Jacket",
      price: "$750",
      img: "/jacket.png",
    },
  ]);

  const justForYou = [
    {
      id: 5,
      name: "ASUS FHD Gaming Laptop",
      price: "$960",
      oldPrice: "$1160",
      discount: "-35%",
      rating: 4.5,
      img: "/laptop.png",
      isNew: true,
    },
    {
      id: 6,
      name: "IPS LCD Gaming Monitor",
      price: "$1160",
      rating: 4.5,
      img: "/monitor.png",
      isNew: true,
    },
    {
      id: 7,
      name: "HAVIT HV-G92 Gamepad",
      price: "$560",
      rating: 4,
      img: "/red-gamepad.png",
    },
    {
      id: 8,
      name: "AK-900 Wired Keyboard",
      price: "$200",
      rating: 4.5,
      img: "/keyboard.png",
    },
  ];

  const handleDelete = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔹 Common Button Style (black border + black text + white bg)
  const buttonStyle = {
    borderColor: theme.Text1,
    color: theme.Text1,
    bgcolor: theme.primary1,
    px: 5,
    py: 1.2,
    borderRadius: 0,
    fontSize: 14,
    fontWeight: 500,
    textTransform: "none" as const,
    boxShadow: "none",
    "&:hover": {
      bgcolor: theme.Button2,
      color: "white",
      borderColor: theme.Button2,
      boxShadow: "none",
    },
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 6,
        bgcolor: theme.primary1,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" sx={{ fontWeight: 300, color: theme.Text1 }}>
            Wishlist ({wishlist.length})
          </Typography>
          <Button variant="outlined"  sx={buttonStyle}>
            Move All To Bag
          </Button>
        </Box>

        {/* Wishlist Grid */}
        <Grid container spacing={3} mb={8}>
          {wishlist.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={3}>
              <WishlistCard {...item} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>

        {/* Just For You Section */}
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 20,
                  height: 40,
                  bgcolor: theme.Button2,
                  borderRadius: 1,
                }}
              />
              <Typography
                variant="h4"
                sx={{ fontWeight: 300, color: theme.Text1 }}
              >
                Just For You
              </Typography>
            </Box>

            {/* 🔹 "View All" button aligned right */}
            <Button variant="outlined" sx={buttonStyle}>
              See All
            </Button>
          </Box>

          <Grid container spacing={3}>
            {justForYou.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={3}>
                <ProductCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default WishlistPage;
