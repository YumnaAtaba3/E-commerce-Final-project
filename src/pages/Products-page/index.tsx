import React, { useState, useEffect } from "react";
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
import ProductCard from "../../shared/components/ProductCard";
import { useTheme } from "../../theme/ThemeProvider";

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  img: string;
  isNew?: boolean;
}

const ProductPage: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  // Media queries
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm")); // xs
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md")); // sm/md iPad

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Simulate fetching products
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const allProducts: Product[] = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: `$${(i + 1) * 100}`,
        oldPrice: i % 2 === 0 ? `$${(i + 1) * 120}` : undefined,
        discount: i % 2 === 0 ? "-15%" : undefined,
        rating: Math.round(Math.random() * 5 * 10) / 10,
        img: "/bag.png",
        isNew: i % 3 === 0,
      }));
      setProducts(allProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const pageCount = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 6,
        bgcolor: theme.primary1,
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
        {/* Page Title */}
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ fontWeight: 700, color: theme.Text1, mb: 4 }}
        >
          All Products
        </Typography>

        {/* Product Grid */}
        <Grid
          container
          spacing={3}
          justifyContent={isMobile || isTablet ? "center" : "flex-start"} // center on mobile/tablet
        >
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, i) => (
                <Grid
                  item
                  key={i}
                  xs={10} // full width mobile
                  sm={6} // 2 per row tablet
                  md={3} // 4 per row desktop
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Skeleton variant="rectangular" height={250} width="100%" />
                  <Skeleton width="60%" sx={{ mt: 1 }} />
                  <Skeleton width="40%" sx={{ mt: 0.5 }} />
                </Grid>
              ))
            : displayedProducts.map((product) => (
                <Grid
                  item
                  key={product.id}
                  xs={10} // full width mobile
                  sm={6} // 2 per row tablet
                  md={3} // 4 per row desktop
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <ProductCard {...product} />
                </Grid>
              ))}
        </Grid>

        {/* Pagination */}
        {!loading && pageCount > 1 && (
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
                    "&.Mui-selected": {
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
