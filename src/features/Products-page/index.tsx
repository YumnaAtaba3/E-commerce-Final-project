import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  PaginationItem,
  IconButton,
  useMediaQuery,
  Skeleton,
  useTheme as useMuiTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

import { useTheme } from "../../theme/ThemeProvider";
import FilterSidebar from "../Home-page/components/FilterSidebar";
import ProductCard from "../../shared/components/Product-card";
import ErrorState from "../../shared/components/Error-state";
import { useProductPage } from "./hooks/useProductPage";

const ProductPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const [openFilter, setOpenFilter] = useState(false);

  const {
    products,
    isLoading,
    isError,
    refetch,
    page,
    pageCount,
    handlePageChange,
    handleCategorySelect,
    pageTitle,
  } = useProductPage();

  // Skeleton helpers
  const skeletonArray = Array.from({ length: 8 }, (_, i) => i);

  return (
    <Box
      sx={{
        display: "flex",
        px: { xs: 2, md: 4 },
        py: 6,
        bgcolor: theme.primary1,
      }}
    >
      {/* Sidebar */}
      {!isMobile && (
        <Box sx={{ width: 250, mr: 3 }}>
      
            <FilterSidebar onCategorySelect={handleCategorySelect} />
         
        </Box>
      )}

      <Box sx={{ flex: 1, maxWidth: 1200, mx: "auto" }}>
        {isMobile && (
          <FilterSidebar
            onCategorySelect={handleCategorySelect}
            open={openFilter}
            setOpen={setOpenFilter}
          />
        )}

        {/* Header */}
        <Box display="flex" alignItems="center" mb={4}>
          <IconButton
            onClick={() => window.history.back()}
            sx={{
              ml: 6,
              mr:2,
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

        {/* Loading Skeletons */}
        {isLoading && (
          <Grid container spacing={6}  justifyContent="center">
            {skeletonArray.map((i) => (
              <Grid item key={i} xs={12} sm={6} md={3}>
               
                <Box
                  sx={{
                    bgcolor: theme.primary1,
                    borderRadius: 2,
                    p: 1,
                    boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
                  }}
                >
                 
                  <Skeleton
                    variant="rectangular"
                    height={150}
                    sx={{ borderRadius: 2 }}
                  />

                
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                   
                  </Box>

                  
                  <Skeleton variant="text" height={30} sx={{ mt: 1 }} />

                  
                  <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                    <Skeleton variant="text" width="50%" height={25} />
                    <Skeleton variant="text" width="30%" height={25} />
                  </Box>

                  
                  <Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Skeleton
                        key={idx}
                        variant="circular"
                        width={20}
                        height={20}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
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
            {products.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  mt: 6,
                  p: 4,
                  borderRadius: 4,
                  bgcolor: theme.primary1,
                }}
              >
                <SentimentDissatisfiedIcon
                  sx={{ fontSize: 60, color: theme.Button2, mb: 2 }}
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
              <Grid container spacing={3} justifyContent="center">
                {products.map((product) => (
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

            {/* Pagination */}
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
