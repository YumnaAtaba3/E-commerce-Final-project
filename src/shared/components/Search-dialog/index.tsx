import React from "react";
import { Dialog, DialogContent, Box, Typography } from "@mui/material";
import { useTheme as useAppTheme } from "../../../theme/ThemeProvider";
import SearchBar from "./components/SearchBar";
import PopularSearches from "./components/PopularSearches";
import SearchProductCard from "./components/SearchProductCard";
import { useSearchDialog } from "./hooks/useSearchDialog";
import { motion } from "framer-motion";
import type { Product } from "../../../store/state";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, duration: 0.5, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

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
          overflow: "hidden",
        },
      }}
    >
      <DialogContent sx={{ p: 2 }}>
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <SearchBar query={query} setQuery={setQuery} isLoading={isLoading} />
        </motion.div>

        {/* Popular Searches */}
        {!debouncedQuery && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <PopularSearches onClick={handlePopularSearchClick} />
          </motion.div>
        )}

        {/* Products or Skeletons */}
        {isLoading || filteredProducts.length > 0 ? (
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            }}
            gap={2}
            mt={2}
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <Box
                      sx={{
                        borderRadius: 3,
                        bgcolor: theme.primary1,
                        border: `1px solid ${theme.borderColor}`,
                        overflow: "hidden",
                        p: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: 160,
                          borderRadius: 2,
                          bgcolor: theme.secound1,
                          mb: 1,
                        }}
                      />
                      <Box
                        sx={{
                          width: "80%",
                          height: 24,
                          bgcolor: theme.secound1,
                          mb: 1,
                        }}
                      />
                      <Box display="flex" gap={1}>
                        <Box
                          sx={{
                            width: "30%",
                            height: 20,
                            bgcolor: theme.secound1,
                          }}
                        />
                        <Box
                          sx={{
                            width: "40%",
                            height: 20,
                            bgcolor: theme.secound1,
                          }}
                        />
                      </Box>
                    </Box>
                  </motion.div>
                ))
              : filteredProducts.map((product: Product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <SearchProductCard
                      product={product}
                      favorite={isInWishlist(product.id)}
                      onWishlistToggle={() => toggleWishlist(product)}
                    />
                  </motion.div>
                ))}
          </Box>
        ) : (
          debouncedQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Typography textAlign="center" color="gray" mt={3}>
                No results found for "{debouncedQuery}"
              </Typography>
            </motion.div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
