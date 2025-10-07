import React, { useState, useEffect } from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Grid,
  useMediaQuery,
  useTheme as useMuiTheme,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";

import { useTheme } from "../../theme/ThemeProvider";
import {
  useProductByIdQuery,
  useRelatedProductsQuery,
} from "../Products-page/hooks/useProducts";

import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";
import RelatedItems from "./components/RelatedItems";


import DeliveryIcon from "../../assets/Product-details/icon-delivery (2).svg";
import ReturnIcon from "../../assets/Product-details/Icon-return.svg";

import { useWishlistStore } from "../../store/wishlistStore";
import ErrorState from "../../shared/components/Error-state";
import LoadingState from "../../shared/components/Loading-state";

// Helper: generate random colors
const getRandomColors = (count: number = 3) => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    colors.push(color);
  }
  return colors;
};

const ProductDetailsPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));
  const { id } = useParams<{ id: string }>();
  const productId = id ? Number(id) : undefined;

  const { data: product, isLoading: loadingProduct } =
    useProductByIdQuery(productId);
  const { data: relatedProducts = [], isLoading: loadingRelated } =
    useRelatedProductsQuery(productId, 4);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("#fff");
  const [colors, setColors] = useState<string[]>([]);
  const [favorite, setFavorite] = useState(false);

  // Wishlist store
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  useEffect(() => {
    if (product) {
      setFavorite(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  const handleFavoriteToggle = () => {
    if (!product) return;

    if (favorite) removeFromWishlist(product.id);
    else addToWishlist(product);

    setFavorite((prev) => !prev);
  };

  useEffect(() => {
    if (product) {
      let productColors: string[] = [];

      if (product.colors) {
        productColors = Array.isArray(product.colors)
          ? product.colors
          : [product.colors];
      }

      if (productColors.length === 0) {
        productColors = getRandomColors(3);
      }

      setColors(productColors);
      setColor(productColors[0]);
    }
  }, [product]);

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity(quantity + 1);
    else if (quantity > 1) setQuantity(quantity - 1);
  };

  // ---------- Render Loading/Error States ----------
  if (loadingProduct) {
    return (
      <LoadingState
        title="Loading product..."
        description="Please wait while we fetch the product details."
      />
    );
  }

  if (!product) {
    return (
      <ErrorState
        title="Product not found"
        description="The product you are looking for does not exist."
        onRetry={() => window.location.reload()}
      />
    );
  }

  const thumbnails = product.images.length ? product.images : ["/bag.png"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  const relatedItems = relatedProducts.map((p) => {
    const itemColors =
      p.colors && p.colors.length > 0 ? p.colors : getRandomColors(3);
    return {
      id: p.id,
      name: p.title,
      price: `$${p.price}`,
      oldPrice: p.price ? `$${Math.floor(p.price * 1.2)}` : undefined,
      discount: p.discount,
      rating: p.rating ?? 0,
      img: p.images[0] || "/bag.png",
      colors: itemColors,
    };
  });

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 6,
        bgcolor: theme.primary1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {/* Breadcrumbs */}
        <Box
          sx={{
            mb: 4,
            overflowX: "auto",
            width: "100%",
            pl: isMobile ? 0 : 20,
          }}
        >
          <Breadcrumbs
            separator="›"
            sx={{ fontSize: 14, "& a, & span": { whiteSpace: "nowrap" } }}
          >
            <Link underline="hover" color="text.secondary" href="/">
              Home
            </Link>
            <Link underline="hover" color="text.secondary" href="/">
              {product.category?.name || "Category"}
            </Link>
            <Typography color="text.primary" fontSize={14}>
              {product.title}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Product Images & Info */}
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
          }}
        >
          <Grid>
            <ProductImages thumbnails={thumbnails} mainImage={thumbnails[0]} />
          </Grid>
          <Grid>
            <ProductInfo
              product={product}
              isMobile={isMobile}
              isTablet={isTablet}
              quantity={quantity}
              size={size}
              color={color}
              favorite={favorite}
              onQuantityChange={handleQuantity}
              onSizeChange={setSize}
              onColorChange={setColor}
              onFavoriteToggle={handleFavoriteToggle}
              sizes={sizes}
              colors={colors}
              DeliveryIcon={DeliveryIcon}
              ReturnIcon={ReturnIcon}
            />
          
          </Grid>
        </Grid>

        {/* Related Items */}
        <Box mt={8}>
          {loadingRelated ? (
            <LoadingState
              title="Loading related items..."
              description="Fetching items you may like."
              height={200}
            />
          ) : relatedItems.length ? (
            <RelatedItems items={relatedItems} />
          ) : (
            <ErrorState
              title="No related items found"
              description="There are no similar products at the moment."
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
