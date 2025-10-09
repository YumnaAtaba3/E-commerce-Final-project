import { useState, useMemo } from "react";
import { useSearchStore } from "../../../../store/searchStore";
import { useDebounce } from "../../../hooks/debounce";
import { useWishlistStore } from "../../../../store/wishlistStore";
import { useProductsQuery } from "../../../../features/Products-page/hooks/useProducts";
import type { Product } from "../../../../store/state";


export const useSearchDialog = () => {
  const { open, setOpen } = useSearchStore();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  const { data: products = [], isLoading, isError, refetch } = useProductsQuery();

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p: Product) =>
          p.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.category?.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      ),
    [products, debouncedQuery]
  );

  const handleClose = (event: object, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      setOpen(false);
      setQuery("");
    }
  };

  const handlePopularSearchClick = (term: string) => setQuery(term);

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return {
    open,
    setOpen,
    query,
    setQuery,
    debouncedQuery,
    filteredProducts,
    isLoading,
    isError,
    refetch,
    handleClose,
    handlePopularSearchClick,
    toggleWishlist,
    isInWishlist,
  };
};
