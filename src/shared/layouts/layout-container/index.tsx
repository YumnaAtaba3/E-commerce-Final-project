import Footer from "../Footer";
import Header from "../Header";
import PromoBar from "../../components/Promo-bar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router";

export function LayoutContainer() {
  return (
    <>
      <PromoBar />
      <Header />
      <Box sx={{ height: { xs: 50 + 55, sm: 40 + 55 }, width: "100%" }} />
      <Outlet />
      <Footer />
    </>
  );
}
