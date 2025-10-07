import React from "react";
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
import ProductCard from "../../shared/components/Product-card";
import { useTheme } from "../../theme/ThemeProvider";
import { useWishlistStore } from "../../store/wishlistStore";
import { useProductsQuery } from "../../features/Products-page/hooks/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const WishlistPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

  const wishlist = useWishlistStore((state) => state.wishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  // Fetch products with React Query
  const { data: products = [], isLoading, isError } = useProductsQuery();

  const handleDelete = (id: number) => removeFromWishlist(id);

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
  const justForYou = products.slice(0, 8);

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
              onClick={() => clearWishlist()}
            >
              Move All To Bag
            </Button>
          )}
        </Box>

        {/* Wishlist Grid */}
        {wishlist.length > 0 ? (
          <Grid
            container
            spacing={isMobile ? 2 : 3}
            mb={6}
            justifyContent={isMobile ? "center" : "flex-start"}
          >
            {wishlist.map((item) => (
              <Grid key={item.id}>
                <WishlistCard
                  id={item.id}
                  name={item.name || item.title || "Unnamed Product"}
                  price={item.price ?? 0}
                  oldPrice={item.oldPrice}
                  discount={item.discount}
                  images={
                    item.images?.length
                      ? item.images
                      : [item.img || "/placeholder.png"]
                  }
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 6, color: theme.Text1 }}>
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
              onClick={() => navigate("/products")}
            >
              View All
            </Button>
          </Box>

          {isLoading ? (
            <Typography sx={{ color: theme.Text1 }}>
              Loading products...
            </Typography>
          ) : isError ? (
            <Typography sx={{ color: theme.Text1 }}>
              Failed to load products.
            </Typography>
          ) : justForYou.length === 0 ? (
            <Typography sx={{ color: theme.Text1 }}>
              No products available.
            </Typography>
          ) : (
            <Swiper
              spaceBetween={10}
              slidesPerView={isMobile ? 1.1 : 4.1}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[Navigation]}
            >
              {justForYou.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    id={product.id}
                    name={product.title}
                    price={`$${product.price}`}
                    oldPrice={product.oldPrice}
                    discount={product.discount}
                    rating={product.rating}
                    img={product.images?.[0]|| "/placeholder.png"}
                    isNew={product.isNew}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WishlistPage;
