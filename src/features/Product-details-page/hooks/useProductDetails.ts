
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductByIdQuery, useRelatedProductsQuery } from "../../Products-page/hooks/useProducts";
import { useWishlistStore } from "../../../store/wishlistStore";

const getRandomColors = (count: number = 3) => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const color =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    colors.push(color);
  }
  return colors;
};

export const useProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? Number(id) : undefined;

  const { data: product, isLoading: loadingProduct } = useProductByIdQuery(productId);
  const { data: relatedProducts = [], isLoading: loadingRelated } = useRelatedProductsQuery(productId, 4);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("#fff");
  const [colors, setColors] = useState<string[]>([]);
  const [favorite, setFavorite] = useState(false);

  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  useEffect(() => {
    if (product) {
      setFavorite(isInWishlist(product.id));

      let productColors: string[] = [];
      if (product.colors) {
        productColors = Array.isArray(product.colors) ? product.colors : [product.colors];
      }
      if (productColors.length === 0) productColors = getRandomColors(3);

      setColors(productColors);
      setColor(productColors[0]);
    }
  }, [product, isInWishlist]);

  const handleFavoriteToggle = () => {
    if (!product) return;
    if (favorite) removeFromWishlist(product.id);
    else addToWishlist(product);
    setFavorite((prev) => !prev);
  };

  const handleQuantity = (type: "inc" | "dec") =>
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(prev - 1, 1)));

  const thumbnails = product?.images.length ? product.images : ["/bag.png"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const relatedItems = relatedProducts.map((p) => {
    const itemColors = p.colors && p.colors.length > 0 ? p.colors : getRandomColors(3);
    return {
      id: p.id,
      name: p.title,
      price: `$${p.price}`,
      oldPrice: p.price ? `$${Math.floor(p.price * 1.2)}` : undefined,
      discount: p.discount,
      rating: p.rating ?? 0,
      img: p.images[0] || "/bag.png",
      colors: itemColors,
    };
  });

  return {
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
  };
};
