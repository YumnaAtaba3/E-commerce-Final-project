// pages/ProductDetailsPage.tsx
import React, { useState } from "react";
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
import Footer from "../../shared/components/Footer";

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
  const [favorite, setFavorite] = useState(false);

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity(quantity + 1);
    else if (quantity > 1) setQuantity(quantity - 1);
  };

  if (loadingProduct) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const thumbnails = product.images.length ? product.images : ["/bag.png"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["#896", "#000"];

  const relatedItems = relatedProducts.map((p) => ({
    id: p.id,
    name: p.title,
    price: `$${p.price}`,
    oldPrice: p.price ? `$${Math.floor(p.price * 1.2)}` : undefined,
    discount: p.discount,
    rating: p.rating,
    img: p.images[0] || "/bag.png",
  }));

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 6,
        bgcolor: "#fff",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: 1200, width: "100%" }}>
        {/* Breadcrumb */}
        <Box
          sx={{
            mb: 4,
            overflowX: "auto",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          <Breadcrumbs
            separator="›"
            sx={{
              fontSize: 14,
              "& a, & span": { whiteSpace: "nowrap" },
            }}
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

        {/* Product Section */}
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          sx={{ flexDirection: { xs: "column", md: "row" } }}
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
              onFavoriteToggle={() => setFavorite(!favorite)}
              sizes={sizes}
              colors={colors}
              DeliveryIcon={DeliveryIcon}
              ReturnIcon={ReturnIcon}
            />
          </Grid>
        </Grid>

        {/* Related Items Section */}
        {!loadingRelated && relatedItems.length > 0 && (
          <Box mt={8}>
            <RelatedItems items={relatedItems} />
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductDetailsPage;
