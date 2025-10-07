import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Link,
  IconButton,
  InputBase,
  Typography,
  Badge,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "../../../theme/ThemeProvider";
import { Link as RouterLink, useLocation } from "react-router";
import { motion } from "framer-motion";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import AccountDropdown from "../../components/Account-dropdown";
import MobileNavDrawer from "./components/MobileNavDrawer";
import SearchDialog from "../../../shared/components/Search-dialog";

import { useWishlistStore } from "../../../store/wishlistStore";
import { useSearchStore } from "../../../store/searchStore";
import { appRoutes } from "../../../routes/index";

// Shared nav links
const navLinks = [
  { label: "Home", to: appRoutes.home, icon: <HomeIcon /> },
  { label: "About", to: appRoutes.about, icon: <InfoIcon /> },
  { label: "Contact", to: appRoutes.contact, icon: <ContactMailIcon /> },
  { label: "Sign Up", to: appRoutes.auth.signUp, icon: <PersonAddIcon /> },
];

const Header: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const location = useLocation();
  const wishlist = useWishlistStore((state) => state.wishlist);
  const searchStore = useSearchStore();

  // Close account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setAccountOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinkVariants = {
    initial: { scale: 1, color: theme.Text1 },
    hover: {
      scale: 1.05,
      color: theme.HoverButton,
      transition: { type: "spring", stiffness: 300 },
    },
    active: {
      scale: 1.05,
      color: theme.HoverButton,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <>
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
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Typography
              component={RouterLink}
              to={appRoutes.home}
              sx={{
                textDecoration: "none",
                fontFamily: theme.font,
                fontWeight: 600,
                fontSize: isMobile ? 20 : 26,
                color: theme.Text1,
                letterSpacing: 1,
                pl: isMobile ? 0 : 10,
              }}
            >
              Exclusive
            </Typography>
          </motion.div>

          {/* Desktop Nav Links */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 4 }}>
              {navLinks.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <motion.div
                    key={item.label}
                    initial="initial"
                    animate={isActive ? "active" : "initial"}
                    whileHover="hover"
                    variants={navLinkVariants}
                  >
                    <Link
                      component={RouterLink}
                      to={item.to}
                      underline="none"
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: theme.font,
                        cursor: "pointer",
                        color: isActive ? theme.HoverButton : theme.Text1,
                        position: "relative",
                        "&::after": isActive
                          ? {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              bottom: -4,
                              width: "100%",
                              height: 2,
                              bgcolor: theme.HoverButton,
                              borderRadius: 1,
                            }
                          : {},
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </Box>
          )}

          {/* Icons & Search */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Desktop Search Input opens SearchDialog */}
            {!isMobile && (
              <Box
                onClick={() => searchStore.setOpen(true)}
                sx={{
                  bgcolor: theme.disabledText,
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.5,
                  display: "flex",
                  alignItems: "center",
                  width: 250,
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <SearchIcon sx={{ fontSize: 20, color: theme.Text1, mr: 1 }} />
                <Typography
                  sx={{
                    fontSize: 12,
                    color: theme.Text1,
                    fontFamily: theme.font,
                  }}
                >
                  What are you looking for?
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 11,
                    color: theme.Text1,
                    userSelect: "none",
                  }}
                >
                  Ctrl + /
                </Typography>
              </Box>
            )}

            {/* Wishlist */}
            <IconButton component={RouterLink} to={appRoutes.wishlist}>
              <Badge badgeContent={wishlist.length} color="secondary">
                <FavoriteBorderIcon sx={{ color: theme.Text1 }} />
              </Badge>
            </IconButton>

            {/* Cart */}
            <IconButton component={RouterLink} to={appRoutes.cart}>
              <ShoppingCartOutlinedIcon sx={{ color: theme.Text1 }} />
            </IconButton>

            {/* Account Dropdown */}
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setAccountOpen((prev) => !prev);
                }}
              >
                <PersonOutlineIcon sx={{ color: theme.Text1 }} />
              </IconButton>
              <AccountDropdown
                open={accountOpen}
                theme={theme}
                isMobile={isMobile}
              />
            </Box>

            {/* Mobile Search & Menu */}
            {isMobile && (
              <Box sx={{ display: "flex", alignItems: "end", gap: 1 }}>
                <IconButton onClick={() => searchStore.setOpen(true)}>
                  <SearchIcon sx={{ color: theme.Text1 }} />
                </IconButton>
                <IconButton onClick={() => setMenuOpen((p) => !p)}>
                  {menuOpen ? (
                    <CloseIcon sx={{ color: theme.Text1 }} />
                  ) : (
                    <MenuIcon sx={{ color: theme.Text1 }} />
                  )}
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      {isMobile && (
        <MobileNavDrawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          navLinks={navLinks}
        />
      )}
    </>
  );
};

export default Header;
