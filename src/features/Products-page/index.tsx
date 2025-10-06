import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Skeleton,
  Pagination,
  PaginationItem,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useLocation } from "react-router";
import ProductCard from "../../shared/components/Product-card";
import { useTheme } from "../../theme/ThemeProvider";
import { useProductsQuery } from "./hooks/useProducts";

const getRandomColors = (count: number = 3) => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(color);
  }
  return colors;
};

const ProductPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter");
  const withColors = queryParams.get("withColors") === "true"; // check URL

  const { data: allProducts = [], isLoading: loading } = useProductsQuery(
    0,
    50
  );

  const products =
    filter === "discount"
      ? allProducts.filter((p) => !!p.discount)
      : allProducts;

  // 🔹 Only generate colors if `withColors` is true
  const productsWithColors = useMemo(
    () =>
      products.map((p) => ({
        ...p,
        colors: withColors ? getRandomColors(3) : undefined,
      })),
    [products, withColors]
  );

  const pageCount = Math.ceil(productsWithColors.length / itemsPerPage);
  const displayedProducts = productsWithColors.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 6, bgcolor: theme.primary1 }}>
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ fontWeight: 700, color: theme.Text1, mb: 4 }}
        >
          {filter === "discount" ? "Discounted Products" : "All Products"}
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent={isMobile || isTablet ? "center" : "flex-start"}
        >
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, i) => (
                <Grid
                  key={i}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Skeleton variant="rectangular" height={250} width="100%" />
                  <Skeleton width="60%" sx={{ mt: 1 }} />
                  <Skeleton width="40%" sx={{ mt: 0.5 }} />
                </Grid>
              ))
            : displayedProducts.map((product) => (
                <Grid
                  key={product.id}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.title}
                    price={`$${product.price}`}
                    oldPrice={product.oldPrice}
                    discount={product.discount}
                    rating={product.rating}
                    img={product.images[0]}
                    isNew={product.isNew}
                    colors={product.colors} // only passed if withColors=true
                  />
                </Grid>
              ))}
        </Grid>

        {!loading && pageCount > 0 && (
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
                    borderColor: item.selected ? theme.Button2 : theme.Text1,
                    bgcolor: item.selected ? theme.Button2 : "transparent",
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
      </Box>
    </Box>
  );
};

export default ProductPage;
