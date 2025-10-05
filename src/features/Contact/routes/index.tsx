import { lazy } from "react";
const Contact  = lazy(() => import("../index"));
export const ContactRoutes = [
  {
    path: "/contact",
    element: <Contact />,
  },
];
