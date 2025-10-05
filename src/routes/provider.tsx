import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import { CircularProgress, Box } from "@mui/material";

import { LayoutContainer } from "../shared/layouts/layout-container";
import AuthLayout from "../shared/layouts/Auth-layout";

//pages
import { AboutRoutes } from "../features/About/routes";
import { CartRoutes } from "../features/Cart/routes";
import { ContactRoutes } from "../features/Contact/routes";
import { CheckOutRoutes } from "../features/CheckOut/routes";
import { HomepageRoutes } from "../features/Home-page/routes/indesx";
import { authRoutes } from "../shared/layouts/Auth-layout/routes";
import { ProductsRoutes } from "../features/Products-page/routes";
import { ProductDetailsRoutes } from "../features/Product-details-page/routes";
import { WishlistRoutes } from "../features/Wish-list/routes";
import { useTheme } from "../theme/ThemeProvider";

const NotFoundPage = lazy(() => import("../shared/pages/Not-found-page"));

const routes = [
  {
    path: "/",
    element: <LayoutContainer />,
    children: [
      ...AboutRoutes,
      ...CartRoutes,
      ...ContactRoutes,
      ...CheckOutRoutes,
      ...HomepageRoutes,
      ...ProductsRoutes,
      ...ProductDetailsRoutes,
      ...WishlistRoutes,
      {
        element: <AuthLayout />,
        children: [...authRoutes],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export function AppRouterProvider() {
  const {theme} = useTheme();

  return (
    <Suspense
      fallback={
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor={theme.primary1}
        >
          <CircularProgress sx={{ color: theme.Text1 }} />
        </Box>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}
