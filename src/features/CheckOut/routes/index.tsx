import { lazy } from "react";
const Checkout  = lazy(() => import("../index"));
export const CheckOutRoutes = [
  {
    path: "/checkout",
    element: <Checkout />,
  },
];
