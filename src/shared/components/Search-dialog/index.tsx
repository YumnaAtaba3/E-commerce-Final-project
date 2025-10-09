import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import { useTheme as useAppTheme } from "../../../theme/ThemeProvider";
import SearchBar from "./components/SearchBar";
import PopularSearches from "./components/PopularSearches";
import SearchProductCard from "./components/SearchProductCard";
import { useSearchDialog } from "./hooks/useSearchDialog";
import type { Product } from "../../../store/state";

const SearchDialog: React.FC = () => {
  const { theme } = useAppTheme();
  const {
    open,
    query,
    setQuery,
    debouncedQuery,
    filteredProducts,
    isLoading,
    handleClose,
    handlePopularSearchClick,
    toggleWishlist,
    isInWishlist,
  } = useSearchDialog();

  const renderSkeletonCards = () =>
    Array.from({ length: 6 }).map((_, i) => (
      <Box
        key={i}
        sx={{
          borderRadius: 3,
          bgcolor: theme.primary1,
          border: `1px solid ${theme.borderColor}`,
          overflow: "hidden",
          p: 2,
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={160}
          sx={{ borderRadius: 2, mb: 1, bgcolor: theme.secound1 }}
        />
        <Skeleton
          variant="text"
          width="80%"
          height={24}
          sx={{ bgcolor: theme.secound1 }}
        />
        <Box display="flex" alignItems="center" gap={1}>
          <Skeleton
            variant="text"
            width="30%"
            height={20}
            sx={{ bgcolor: theme.secound1 }}
          />
          <Skeleton
            variant="text"
            width="40%"
            height={20}
            sx={{ bgcolor: theme.secound1 }}
          />
        </Box>
      </Box>
    ));

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
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            }}
            gap={2}
            mt={2}
          >
            {renderSkeletonCards()}
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
            {filteredProducts.map((product: Product) => (
              <SearchProductCard
                key={product.id}
                product={product}
                favorite={isInWishlist(product.id)}
                onWishlistToggle={() => toggleWishlist(product)}
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
