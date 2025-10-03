import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";


import { LayoutContainer } from "../shared/layouts/layout-container";
import AuthLayout from "../shared/layouts/Auth-layout";

// Centralized route paths
import { appRoutes } from "./index";
import Contact from "../pages/Contact";
import Checkout from "../pages/CheckOut";

// ✅ Lazy-loaded pages
const Homepage = lazy(() => import("../pages/Home-page/index"));
const ProductPage = lazy(() => import("../pages/Products-page/index"));
const ProductDetailsPage = lazy(
  () => import("../pages/Product-details-page/index")
);
const WishlistPage = lazy(() => import("../pages/Wish-list/index"));
const CartPage = lazy(() => import("../pages/Cart/index"));
const AboutPage = lazy(() => import("../pages/About/index"));
const LoginForm = lazy(() => import("../pages/log-in-page"));
const SignUpForm = lazy(() => import("../pages/sign-up-page"));
const NotFoundPage = lazy(() => import("../shared/pages/Not-found-page"));



const routes = [
  {
    path: "/",
    element: <LayoutContainer />, // outer layout
    children: [
      { path: appRoutes.home, element: <Homepage /> },
      { path: appRoutes.products.list, element: <ProductPage /> },
      { path: "/products/:id", element: <ProductDetailsPage /> },
      { path: appRoutes.wishlist, element: <WishlistPage /> },
      { path: appRoutes.cart, element: <CartPage /> },
      { path: appRoutes.about, element: <AboutPage /> },
      { path: appRoutes.contact, element: <Contact /> },
      { path: appRoutes.checkout, element: <Checkout /> },
      {
        element: <AuthLayout />, // inner layout for auth pages
        children: [
          { path: appRoutes.auth.login, element: <LoginForm /> },
          { path: appRoutes.auth.signUp, element: <SignUpForm /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];


const router = createBrowserRouter(routes);

// ✅ App Router Provider
export function AppRouterProvider() {
  return (
    
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
   
  );
}
