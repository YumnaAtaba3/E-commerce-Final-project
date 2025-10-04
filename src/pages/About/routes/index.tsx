import { lazy } from "react";
const AboutPage = lazy(() => import("../index"));
export const AboutRoutes = [
  {
    path: "/about", 
    element: <AboutPage />,
  },
  
];
