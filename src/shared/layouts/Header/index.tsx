import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { AppBar, Toolbar, Box, useMediaQuery, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "../../../theme/ThemeProvider";
import { useWishlistStore } from "../../../store/wishlistStore";
import { useCartStore } from "../../../store/cartStore";
import { useSearchStore } from "../../../store/searchStore";
import { useIsLoggedIn } from "../../../features/auth/hooks/is-logged-in";
import { appRoutes } from "../../../routes";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import MobileNavDrawer from "./components/MobileNavDrawer";
import HeaderProtectedIcons, {
  type HeaderProtectedIconsHandle,
} from "./components/HeaderProtectedIcons";
import HeaderSearchBar from "./components/HeaderSearchBar";
import HeaderNavLinks from "./components/HeaderNavLinks";
import HeaderLogo from "./components/HeaderLogo";

const navLinks = [
  { label: "Home", to: appRoutes.home, icon: <HomeIcon /> },
  { label: "About", to: appRoutes.about, icon: <InfoIcon /> },
  { label: "Contact", to: appRoutes.contact, icon: <ContactMailIcon /> },
  { label: "Sign Up", to: appRoutes.auth.signUp, icon: <PersonAddIcon /> },
];

const Header = forwardRef<HeaderProtectedIconsHandle>((_, ref) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const { isLoggedIn } = useIsLoggedIn();
  const cart = useCartStore((state) => state.cart);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const searchStore = useSearchStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const internalRef = useRef<HeaderProtectedIconsHandle>(null);

  useImperativeHandle(ref, () => ({
    cartIconRef: internalRef.current?.cartIconRef || null,
  }));

  return (
    <AppBar
      position="fixed"
      sx={{
        top: { xs: 50, sm: 35 },
        bgcolor: theme.primary1,
        color: theme.Text1,
        borderBottom: `1px solid ${theme.Text2}`,
        zIndex: 1300,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        <HeaderLogo isMobile={isMobile} theme={theme} />
        <HeaderNavLinks isMobile={isMobile} theme={theme} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <HeaderSearchBar
            theme={theme}
            searchStore={searchStore}
            isMobile={isMobile}
          />
          <HeaderProtectedIcons
            ref={internalRef}
            theme={theme}
            isLoggedIn={isLoggedIn}
            cart={cart}
            wishlist={wishlist}
          />
          {/* Mobile menu icon next to account */}
          {isMobile && (
            <IconButton
              onClick={() => setMenuOpen(true)}
              sx={{ color: theme.Text1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {isMobile && (
            <MobileNavDrawer
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              navLinks={navLinks}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
