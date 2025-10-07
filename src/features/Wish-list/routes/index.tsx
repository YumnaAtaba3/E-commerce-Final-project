import { lazy } from "react";
import { ProtectedPageGuard } from "../../auth/guards"; // ✅ adjust the path if needed

const WishlistPage = lazy(() => import("../index"));

export const WishlistRoutes = [
  {
    path: "/wishlist",
    element: (
      <ProtectedPageGuard>
        <WishlistPage />
      </ProtectedPageGuard>
    ),
  },
];
