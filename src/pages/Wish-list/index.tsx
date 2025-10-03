import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useNavigate } from "react-router"; 
import WishlistCard from "./components/WishlistCard";
import ProductCard from "../../shared/components/ProductCard";
import { useTheme } from "../../theme/ThemeProvider";
import { appRoutes } from "../../routes/index"; 

const WishlistPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate(); // ✅ initialize navigate
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm")); // <600px
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md")); // 600px-900px

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
    { id: 4, name: "Quilted Satin Jacket", price: "$750", img: "/jacket.png" },
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

  const handleDelete = (id: number) =>
    setWishlist((prev) => prev.filter((item) => item.id !== id));

  // Responsive button style
  const buttonStyle = {
    borderColor: theme.Text1,
    color: theme.Text1,
    bgcolor: theme.primary1,
    px: isMobile ? 2 : isTablet ? 3 : 5,
    py: isMobile ? 0.8 : 1.2,
    borderRadius: 0,
    fontSize: isMobile ? 12 : isTablet ? 13 : 14,
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

  const headingFont = isMobile ? 18 : isTablet ? 22 : 24;

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 4,
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
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          mb={3}
          gap={isMobile ? 2 : 0}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 300, color: theme.Text1, fontSize: headingFont }}
          >
            Wishlist ({wishlist.length})
          </Typography>
          {wishlist.length > 0 && (
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={() => navigate(appRoutes.cart)} 
            >
              Move All To Bag
            </Button>
          )}
        </Box>

        {/* Wishlist Grid OR Empty State */}
        {wishlist.length > 0 ? (
          <Grid
            container
            spacing={isMobile ? 2 : 3}
            mb={6}
            justifyContent={isMobile ? "center" : "flex-start"}
          >
            {wishlist.map((item) => (
              <Grid  key={item.id}>
                <WishlistCard {...item} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              color: theme.Text1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 400, fontSize: 18 }}>
              Your wishlist is empty 🛒
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: theme.secound1 }}>
              Start adding items you love!
            </Typography>
          </Box>
        )}

        {/* Just For You Section */}
        <Box>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            justifyContent="space-between"
            alignItems={isMobile ? "flex-start" : "center"}
            mb={2}
            gap={isMobile ? 1 : 0}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  width: 20,
                  height: 40,
                  bgcolor: theme.Button2,
                  borderRadius: 1,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 300,
                  color: theme.Text1,
                  fontSize: headingFont,
                }}
              >
                Just For You
              </Typography>
            </Box>

            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={() => navigate(appRoutes.products.list)} 
            >
              See All
            </Button>
          </Box>

          <Grid
            container
            spacing={isMobile ? 2 : 3}
            justifyContent={isMobile ? "center" : "flex-start"}
          >
            {justForYou.map((item) => (
              <Grid  key={item.id} >
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
