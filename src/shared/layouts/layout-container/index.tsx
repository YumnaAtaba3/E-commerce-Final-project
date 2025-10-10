import Footer from "../Footer";
import Header from "../Header";
import PromoBar from "../../components/Promo-bar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";
import React, { useRef } from "react";
import type { HeaderProtectedIconsHandle } from "../Header/components/HeaderProtectedIcons";

export function LayoutContainer() {
  const cartRef = useRef<HeaderProtectedIconsHandle>(null);

  return (
    <>
      <PromoBar />
      <Header ref={cartRef} />
      <Box sx={{ height: { xs: 50 + 55, sm: 40 + 55 }, width: "100%" }} />
      <Outlet context={{ cartRef }} />
      <Footer />
    </>
  );
}
