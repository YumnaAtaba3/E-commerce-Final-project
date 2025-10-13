import Footer from "../Footer";
import Header from "../Header";
import PromoBar from "../../components/Promo-bar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";
import { useRef } from "react";
import type { HeaderProtectedIconsHandle } from "../Header/components/HeaderProtectedIcons";
import { useSearchStore } from "../../../store/searchStore";
import SearchDialog from "../../components/Search-dialog";

export function LayoutContainer() {
  const cartRef = useRef<HeaderProtectedIconsHandle>(null);
  const open = useSearchStore((state) => state.open);

  return (
    <>
      <PromoBar />
      <Header ref={cartRef} />
      <Box sx={{ height: { xs: 50 + 55, sm: 40 + 55 }, width: "100%" }} />

      {/* Main page content */}
      <Outlet context={{ cartRef }} />

      
      {open && <SearchDialog />}

      <Footer />
    </>
  );
}
