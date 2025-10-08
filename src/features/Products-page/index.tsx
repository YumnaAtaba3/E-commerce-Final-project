/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  PaginationItem,
  IconButton,
  useMediaQuery,
  useTheme as useMuiTheme,
  
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { useLocation, useNavigate } from "react-router";
import ProductCard from "../../shared/components/Product-card";
import LoadingState from "../../shared/components/Loading-state";
import ErrorState from "../../shared/components/Error-state";
import { useTheme } from "../../theme/ThemeProvider";
import FilterSidebar from "../Home-page/components/FilterSidebar";
import { useProductsQuery, type Product } from "./hooks/useProducts";

const ProductPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categorySlug =
    queryParams.get("categorySlug") || queryParams.get("category") || undefined;
  const filterType = queryParams.get("filter");

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProductsQuery(page, itemsPerPage, categorySlug) as {
    data: Product[];
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
  };

  const filteredProducts = useMemo(() => {
    let result = products;
    if (filterType === "discount") {
      result = result.filter((p) => p.discount);
    }
    return result;
  }, [products, filterType]);

  const pageCount = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);

  const handlePageChange = (_: any, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageTitle =
    filterType === "discount" && categorySlug
      ? `Discounted ${
          categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
        }`
      : filterType === "discount"
      ? "Discounted Products"
      : categorySlug
      ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
      : "All Products";

  const handleCategorySelect = (slug?: string) => {
    const params = new URLSearchParams(location.search);
    if (slug) params.set("categorySlug", slug);
    else params.delete("categorySlug");

 
    if (filterType === "discount") {
      params.set("filter", "discount");
    }

    navigate(`/products?${params.toString()}`);
  };

 
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        px: { xs: 2, md: 4 },
        py: 6,
        bgcolor: theme.primary1,
      }}
    >
      {/* Desktop sidebar */}
      {!isMobile && <FilterSidebar onCategorySelect={handleCategorySelect} />}

      {/*  Mobile Drawer Trigger */}
      <Box sx={{ flex: 1, maxWidth: 1200, mx: "auto" }}>
        {isMobile && (
          <>
          

         
            <FilterSidebar
              onCategorySelect={handleCategorySelect}
              open={openFilter}
              setOpen={setOpenFilter}
            />
          </>
        )}

        {/*  Header */}
        <Box display="flex" alignItems="center" mb={4}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              mr: 1,
              bgcolor: theme.primary1,
              color: theme.Text1,
              "&:hover": { bgcolor: theme.Button2 },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ fontWeight: 700, color: theme.Text1 }}
          >
            {pageTitle}
          </Typography>
        </Box>

        {/*  Loading */}
        {isLoading && (
          <LoadingState
            title="Loading products..."
            description="Please wait."
            height={400}
          />
        )}

        {/* Error */}
        {isError && (
          <ErrorState
            title="Failed to load products"
            description="Try again."
            onRetry={refetch}
          />
        )}

        {/* Product Grid */}
        {!isLoading && !isError && (
          <>
            {filteredProducts.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  mt: 6,
                  p: 4,
                  borderRadius: 4,
                  bgcolor: theme.primary1 ,
                }}
              >
                <SentimentDissatisfiedIcon
                  sx={{
                    fontSize: 60,
                    color: theme.Button2,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: theme.Text1, mb: 1 }}
                >
                  No Products Found
                </Typography>
                <Typography sx={{ color: theme.Text2, fontSize: 14 }}>
                  Try adjusting your filters or selecting another category.
                </Typography>
              </Box>
            ) : (
              <Grid
                container
                spacing={3}
                justifyContent={isMobile ? "center" : "center"}
              >
                {filteredProducts.map((product) => (
                  <Grid
                    item
                    key={product.id}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <ProductCard
                      id={product.id}
                      name={product.title}
                      price={`$${product.price.toFixed(2)}`}
                      oldPrice={
                        product.oldPrice
                          ? `$${product.oldPrice.toFixed(2)}`
                          : undefined
                      }
                      discount={product.discount}
                      rating={product.rating}
                      img={product.images[0]}
                      isNew={product.isNew}
                    />
                  </Grid>
                ))}
              </Grid>
            )}

            {/*  Pagination */}
            {pageCount > 0 && (
              <Box
                display="flex"
                justifyContent="center"
                mt={6}
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      {...item}
                      sx={{
                        fontSize: isMobile ? 16 : 20,
                        fontWeight: 500,
                        color: item.selected ? "white" : theme.Text1,
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        border: "1px solid",
                        borderColor: item.selected
                          ? theme.Button2
                          : theme.Text1,
                        bgcolor: item.selected
                          ? `${theme.Button2} !important`
                          : "transparent",
                        transition: "all 0.3s",
                        "&:hover": {
                          bgcolor: theme.Button2,
                          color: "white",
                          borderColor: theme.Button2,
                        },
                      }}
                    />
                  )}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductPage;
