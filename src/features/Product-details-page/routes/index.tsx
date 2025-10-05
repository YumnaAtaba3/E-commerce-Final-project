import { lazy } from "react";


const ProductDetailsPage = lazy(
  () => import("../index")
);
export const ProductDetailsRoutes = [
  {
    path: "/products/:id",
    element: <ProductDetailsPage />,
  },
];
