import { lazy } from "react";
import { ProtectedPageGuard } from "../../auth/guards";

const CartPage = lazy(() => import("../index"));

export const CartRoutes = [
  {
    path: "/cart",
    element: (
      <ProtectedPageGuard>
        <CartPage />
      </ProtectedPageGuard>
    ),
  },
];
