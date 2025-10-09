
import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProductsQuery, type Product } from "../hooks/useProducts";

export const useProductPage = (itemsPerPage: number = 8) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categorySlug =
    queryParams.get("categorySlug") || queryParams.get("category") || undefined;
  const filterType = queryParams.get("filter");

  const [page, setPage] = useState(1);

  const { data: products = [], isLoading, isError, refetch } = useProductsQuery(
    page,
    itemsPerPage,
    categorySlug
  ) as { data: Product[]; isLoading: boolean; isError: boolean; refetch: () => void };

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

  const handleCategorySelect = (slug?: string) => {
    const params = new URLSearchParams(location.search);
    if (slug) params.set("categorySlug", slug);
    else params.delete("categorySlug");

    if (filterType === "discount") {
      params.set("filter", "discount");
    }

    navigate(`/products?${params.toString()}`);
    setPage(1);
  };

  const pageTitle =
    filterType === "discount" && categorySlug
      ? `Discounted ${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}`
      : filterType === "discount"
      ? "Discounted Products"
      : categorySlug
      ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
      : "All Products";

  return {
    products: filteredProducts,
    isLoading,
    isError,
    refetch,
    page,
    pageCount,
    handlePageChange,
    handleCategorySelect,
    pageTitle,
  };
};
