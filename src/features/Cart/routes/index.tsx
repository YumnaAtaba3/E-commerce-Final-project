import { lazy } from "react";

const CartPage = lazy(() => import("../index"));

export const CartRoutes = [
  {
    path: "/cart",
    element: (
     
        <CartPage />
     
    ),
  },
];
