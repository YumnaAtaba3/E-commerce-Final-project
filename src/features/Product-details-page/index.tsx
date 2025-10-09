
import React from "react";
import {
  Box,
  Grid,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";
import RelatedItems from "./components/RelatedItems";
import ProductBreadcrumb from "./components/ProductBreadcrumb";
import LoadingState from "../../shared/components/Loading-state";
import ErrorState from "../../shared/components/Error-state";
import DeliveryIcon from "../../assets/Product-details/icon-delivery (2).svg";
import ReturnIcon from "../../assets/Product-details/Icon-return.svg";
import { useProductDetails } from "./hooks/useProductDetails";

const ProductDetailsPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

  const {
    product,
    loadingProduct,
    relatedItems,
    loadingRelated,
    quantity,
    size,
    color,
    colors,
    favorite,
    handleFavoriteToggle,
    handleQuantity,
    setSize,
    setColor,
    sizes,
    thumbnails,
  } = useProductDetails();

  if (loadingProduct)
    return (
      <LoadingState
        title="Loading product..."
        description="Please wait while we fetch the product details."
      />
    );

  if (!product)
    return (
      <ErrorState
        title="Product not found"
        description="The product you are looking for does not exist."
        onRetry={() => window.location.reload()}
      />
    );

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
      <Box sx={{ width: "100%" }}>
        <ProductBreadcrumb
          productTitle={product.title}
          categoryName={product.category?.name}
        />

        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Grid item xs={12} md={6}>
            <ProductImages thumbnails={thumbnails} mainImage={thumbnails[0]} />
          </Grid>

          <Grid item xs={12} md={6}>
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
