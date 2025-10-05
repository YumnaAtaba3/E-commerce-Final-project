import { lazy } from "react";

const ProductPage = lazy(() => import("../index"));
export const ProductsRoutes = [
  {
    path: "/products",
    element: <ProductPage />,
  },
];
