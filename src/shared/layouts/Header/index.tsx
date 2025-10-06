import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Link,
  IconButton,
  InputBase,
  useMediaQuery,
  Typography,
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
import { appRoutes } from "../../../routes/index";
import AccountDropdown from "../../components/Account-dropdown"; 

const Header: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const location = useLocation();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setAccountOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Home", path: appRoutes.home, icon: <HomeIcon /> },
    { label: "About", path: appRoutes.about, icon: <InfoIcon /> },
    { label: "Contact", path: appRoutes.contact, icon: <ContactMailIcon /> },
    { label: "Sign Up", path: appRoutes.auth.signUp, icon: <PersonAddIcon /> },
  ];

  const navLinkVariants = {
    initial: { scale: 1, color: theme.Text1 },
    hover: {
      scale: 1.2,
      color: theme.Text1,
      transition: { type: "spring", stiffness: 300 },
    },
    active: {
      scale: 1.2,
      color: theme.Text1,
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
          color: theme.Text1,
          borderBottom: `1px solid ${theme.Text2}`,
          zIndex: 1300,
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
          {/* ✅ Animated Text Logo */}
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
                        color: theme.Text1,
                        transition: "color 0.3s ease",
                        "&:hover": { color: theme.HoverButton },
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
                          backgroundColor: theme.Text1,
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
                  bgcolor: theme.ButtonCard,
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
                    color: theme.Text1,
                    fontFamily: theme.font,
                    "& input::placeholder": {
                      color: theme.Text1,
                      opacity: 0.7,
                    },
                  }}
                />
                <SearchIcon sx={{ color: theme.Text1, fontSize: 20 }} />
              </Box>
            )}

            <IconButton component={RouterLink} to={appRoutes.wishlist}>
              <FavoriteBorderIcon sx={{ color: theme.Text1 }} />
            </IconButton>
            <IconButton component={RouterLink} to={appRoutes.cart}>
              <ShoppingCartOutlinedIcon sx={{ color: theme.Text1 }} />
            </IconButton>

            {/* ✅ Account Dropdown */}
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

            {/* ✅ Mobile Menu / Search Icons */}
            {isMobile && (
              <>
                <IconButton onClick={() => setSearchOpen((p) => !p)}>
                  {searchOpen ? (
                    <CloseIcon sx={{ color: theme.Text1 }} />
                  ) : (
                    <SearchIcon sx={{ color: theme.Text1 }} />
                  )}
                </IconButton>
                <IconButton onClick={() => setMenuOpen((p) => !p)}>
                  {menuOpen ? (
                    <CloseIcon sx={{ color: theme.Text1 }} />
                  ) : (
                    <MenuIcon sx={{ color: theme.Text1 }} />
                  )}
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Mobile Search Modal */}
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
                color: theme.Text1,
                fontFamily: theme.font,
              }}
            />
            <IconButton onClick={() => setSearchOpen(false)}>
              <CloseIcon sx={{ color: theme.Text1 }} />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* ✅ Mobile Menu Modal */}
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
                  color: theme.Text1,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: "pointer",
                  "&:hover": { color: theme.HoverButton },
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
