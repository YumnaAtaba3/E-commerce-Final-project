/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary"; 

const SignUpPage = lazy(
  () => import("../../../../features/auth/sign-up-page/index")
);
const LoginPage = lazy(
  () => import("../../../../features/auth/log-in-page/index")
);


const Loading = () => <div>Loading...</div>;

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
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <SignUpPage />
        </ErrorBoundary>
      </Suspense>
    ),
  },
];
