import { lazy } from "react";


const WishlistPage   = lazy(
  () => import("../index")
);
export const WishlistRoutes = [
  {
    path: "/wishlist",
    element: <WishlistPage />,
  },
];
