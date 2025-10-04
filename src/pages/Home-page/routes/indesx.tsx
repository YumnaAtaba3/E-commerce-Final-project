import { lazy } from "react";
const Homepage  = lazy(() => import("../index"));
export const HomepageRoutes = [
  {
    path: "/",
    element: <Homepage />,
  },
];
