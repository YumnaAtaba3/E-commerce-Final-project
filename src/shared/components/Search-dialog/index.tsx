// src/components/Search/SearchDialog.tsx
import React, { useState } from "react";
import { Dialog, DialogContent, Box, Typography } from "@mui/material";
import { useSearchStore } from "../../../store/searchStore";
import { useWishlistStore } from "../../../store/wishlistStore";
import { useProductsQuery } from "../../../features/Products-page/hooks/useProducts";
import SearchBar from "./components/SearchBar";
import PopularSearches from "./components/PopularSearches";
import SearchProductCard from "./components/SearchProductCard";
import { useTheme as useAppTheme } from "../../../theme/ThemeProvider";
import { useDebounce } from "../../../shared/hooks/debounce";

const SearchDialog: React.FC = () => {
  const { theme } = useAppTheme();
  const { open, setOpen } = useSearchStore();
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 400);

  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  const { data: products, isLoading } = useProductsQuery();

  // ✅ Filter products by debounced query
  const filteredProducts = products
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.category?.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : [];

  // ✅ Handle closing the dialog
  const handleClose = (
    event: object,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      setOpen(false);
      setQuery("");
    }
  };

  // ✅ Clicking a popular search just sets query
  const handlePopularSearchClick = (term: string) => {
    setQuery(term);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: theme.primary1,
          color: theme.Text1,
          p: 2,
        },
      }}
    >
      <DialogContent sx={{ p: 2 }}>
        <SearchBar query={query} setQuery={setQuery} isLoading={isLoading} />

        {!debouncedQuery && (
          <PopularSearches onClick={handlePopularSearchClick} />
        )}

        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            Loading...
          </Box>
        ) : filteredProducts.length > 0 ? (
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            }}
            gap={2}
          >
            {filteredProducts.map((product) => (
              <SearchProductCard
                key={product.id}
                product={product}
                favorite={isInWishlist(product.id)}
                onWishlistToggle={() =>
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
              />
            ))}
          </Box>
        ) : debouncedQuery ? (
          <Typography textAlign="center" color="gray" mt={3}>
            No results found for "{debouncedQuery}"
          </Typography>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
