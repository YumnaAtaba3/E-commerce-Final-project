import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import { LayoutContainer } from "../shared/layouts/layout-container";
import AuthLayout from "../shared/layouts/Auth-layout";

//pages
import { AboutRoutes } from "../pages/About/routes";
import { CartRoutes } from "../pages/Cart/routes";
import { ContactRoutes } from "../pages/Contact/routes";
import { CheckOutRoutes } from "../pages/CheckOut/routes";
import { HomepageRoutes } from "../pages/Home-page/routes/indesx";
import { authRoutes } from "../shared/layouts/Auth-layout/routes";
import { ProductsRoutes } from "../pages/Products-page/routes";
import { ProductDetailsRoutes } from "../pages/Product-details-page/routes";
import { WishlistRoutes } from "../pages/Wish-list/routes";



const NotFoundPage = lazy(() => import("../shared/pages/Not-found-page"));



const routes = [
  {
    path: "/",
    element: <LayoutContainer />, // outer layout
    children: [
      ...AboutRoutes,
      ...CartRoutes ,
      ...ContactRoutes,
      ...CheckOutRoutes,
      ...HomepageRoutes,
      ...ProductsRoutes,
      ...ProductDetailsRoutes,
      ...WishlistRoutes,
      {
        element: <AuthLayout />, 
        children: [
         ...authRoutes
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];


const router = createBrowserRouter(routes);


export function AppRouterProvider() {
  return (
    
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
   
  );
}
