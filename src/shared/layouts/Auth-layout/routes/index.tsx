import { lazy } from "react";


const SignUpPage = lazy(() => import("../../../../pages/sign-up-page/index"));
const LoginPage = lazy(() => import("../../../../pages/log-in-page/index"));

export const authRoutes = [
  {
    path: "/login",
    element: (

        <LoginPage />
 
    ),
  },
  {
    path: "/sign-up",
    element: (
      
        <SignUpPage />
      
    ),
  },
];
