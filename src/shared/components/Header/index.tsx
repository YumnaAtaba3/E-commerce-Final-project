import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Link,
  IconButton,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "../../../theme/ThemeProvider";
import { Link as RouterLink, useLocation } from "react-router";

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

import { motion } from "framer-motion";

import logo from "../../../assets/Header/Logo.svg";
import { appRoutes } from "../../../routes/index";

const Header: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();

  const navLinks = [
    { label: "Home", path: appRoutes.home, icon: <HomeIcon /> },
    { label: "About", path: appRoutes.about, icon: <InfoIcon /> },
    { label: "Contact", path: appRoutes.contact, icon: <ContactMailIcon /> },
    { label: "Sign Up", path: appRoutes.auth.signUp, icon: <PersonAddIcon /> },
  ];

  // Nav link animation (no need to import Variants)
  const navLinkVariants = {
    initial: { scale: 1, color: "#000" },
    hover: {
      scale: 1.2,
      color: "#000",
      transition: { type: "spring", stiffness: 300 },
    },
    active: {
      scale: 1.2,
      color: "#000",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: { xs: 50, sm: 40 },
          bgcolor: theme.primary1,
          color: "#000",
          borderBottom: `1px solid ${theme.Text2}`,
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to={appRoutes.home}
            sx={{
              height: { xs: 20, md: 22 },
              cursor: "pointer",
              ml: !isMobile ? 10 : 0,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ height: "100%" }}
            />
          </Box>

          {/* Desktop Nav Links */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 4, position: "relative" }}>
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.label}
                    initial="initial"
                    animate={isActive ? "active" : "initial"}
                    whileHover="hover"
                    variants={navLinkVariants}
                    style={{ position: "relative" }}
                  >
                    <Link
                      component={RouterLink}
                      to={item.path}
                      underline="none"
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: theme.font,
                        cursor: "pointer",
                        color: "#000",
                      }}
                    >
                      {item.label}
                    </Link>
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        style={{
                          position: "absolute",
                          bottom: -4,
                          left: 0,
                          height: 2,
                          width: "100%",
                          backgroundColor: "#000",
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </Box>
          )}

          {/* Icons + Mobile Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {!isMobile && (
              <Box
                sx={{
                  bgcolor: "#F6F6F683",
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.5,
                  display: "flex",
                  alignItems: "center",
                  width: 250,
                }}
              >
                <InputBase
                  placeholder="What are you looking for?"
                  sx={{
                    flex: 1,
                    fontSize: 14,
                    color: "#000",
                    fontFamily: theme.font,
                    "& input::placeholder": { color: "#000", opacity: 0.7 },
                  }}
                />
                <SearchIcon sx={{ color: "#000", fontSize: 20 }} />
              </Box>
            )}

            <IconButton component={RouterLink} to={appRoutes.wishlist}>
              <FavoriteBorderIcon sx={{ color: "#000" }} />
            </IconButton>
            <IconButton component={RouterLink} to={appRoutes.cart}>
              <ShoppingCartOutlinedIcon sx={{ color: "#000" }} />
            </IconButton>
            <IconButton component={RouterLink} to={appRoutes.auth.login}>
              <PersonOutlineIcon sx={{ color: "#000" }} />
            </IconButton>

            {isMobile && (
              <>
                <IconButton onClick={() => setSearchOpen((p) => !p)}>
                  {searchOpen ? (
                    <CloseIcon sx={{ color: "#000" }} />
                  ) : (
                    <SearchIcon sx={{ color: "#000" }} />
                  )}
                </IconButton>
                <IconButton onClick={() => setMenuOpen((p) => !p)}>
                  {menuOpen ? (
                    <CloseIcon sx={{ color: "#000" }} />
                  ) : (
                    <MenuIcon sx={{ color: "#000" }} />
                  )}
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Search Modal */}
      {isMobile && searchOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1400,
          }}
          onClick={() => setSearchOpen(false)}
        >
          <Box
            sx={{
              bgcolor: theme.primary1,
              borderRadius: 2,
              width: "80%",
              maxWidth: 300,
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <InputBase
              autoFocus
              placeholder="What are you looking for?"
              sx={{
                flex: 1,
                fontSize: 14,
                color: "#000",
                fontFamily: theme.font,
              }}
            />
            <IconButton onClick={() => setSearchOpen(false)}>
              <CloseIcon sx={{ color: "#000" }} />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Mobile Menu Modal */}
      {isMobile && menuOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1400,
          }}
          onClick={() => setMenuOpen(false)}
        >
          <Box
            sx={{
              bgcolor: theme.primary1,
              borderRadius: 2,
              width: "80%",
              maxWidth: 300,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                component={RouterLink}
                to={item.path}
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#000",
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Header;
