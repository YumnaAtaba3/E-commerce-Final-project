import type { ReactNode } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PromoBar from "../../components/Promo-bar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";

export function LayoutContainer() {
  return (
    <>
      <PromoBar />
      <Header />
      <Box sx={{ height: { xs: 50 + 64, sm: 40 + 64 }, width: "100%" }} />
      <Outlet />
      <Footer />
    </>
  );
}
