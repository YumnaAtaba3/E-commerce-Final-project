import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useWishlistStore } from "../../../store/wishlistStore";
import { useCartStore } from "../../../store/cartStore";
import { useProductsQuery } from "../../Products-page/hooks/useProducts";
import type { Product } from "../../../store/state";
import { appRoutes } from "../../../routes";

export function useWishlistPage() {
  const navigate = useNavigate();
  const wishlist = useWishlistStore((state) => state.wishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const addToCart = useCartStore((state) => state.addToCart);

  const { data: products = [], isLoading, isError, refetch } = useProductsQuery();
  const justForYou = useMemo(() => (products as Product[]).slice(0, 8), [products]);

  const handleDelete = (id: number) => removeFromWishlist(id);
  const handleViewAll = () => navigate(appRoutes.products.list);

  // Move all wishlist items to cart
  const moveAllToBag = () => {
    wishlist.forEach((item) => {
      const product = {
        id: item.id,
        title: item.title,
        price: item.price,
        oldPrice: item.oldPrice,
        discount: item.discount,
        images: item.images,
      };
      addToCart(product, 1);
    });
    clearWishlist();
  };

  return {
    wishlist,
    justForYou,
    isLoading,
    isError,
    refetch,
    handleDelete,
    handleViewAll,
    moveAllToBag,
  };
}
