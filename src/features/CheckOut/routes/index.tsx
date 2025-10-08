import { lazy } from "react";
import { ProtectedPageGuard } from "../../auth/guards";
const Checkout  = lazy(() => import("../index"));
export const CheckOutRoutes = [
  {
    path: "/checkout",
    element: (
      <ProtectedPageGuard>
        
        <Checkout />,
      </ProtectedPageGuard>
    ),
  },
];
