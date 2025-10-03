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
import { useTheme } from "../../theme/ThemeProvider";

import { Link as RouterLink } from "react-router";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import logo from "../../assets/Header/Logo.svg";
import { appRoutes } from "../../routes";

const Header: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: appRoutes.home },
    { label: "About", path: appRoutes.about },
    { label: "Contact", path: appRoutes.contact }, 
    { label: "Sign Up", path: appRoutes.auth.signUp },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        
        sx={{
          
          top: { xs: 50, sm: 40 },
          bgcolor: theme.primary1,
          color: theme.ButtonCard,
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

          {/* Nav Links (desktop only) */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 4 }}>
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  underline="none"
                  sx={{
                    color: theme.Text1,
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: theme.font,
                    "&:hover": { color: theme.ButtonCard },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>
          )}

          {/* Icons + Menu */}
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
                    color: theme.ButtonCard,
                    fontFamily: theme.font,
                    "& input::placeholder": {
                      color: theme.ButtonCard,
                      opacity: 0.7,
                    },
                  }}
                />
                <SearchIcon sx={{ color: theme.ButtonCard, fontSize: 20 }} />
              </Box>
            )}

            <IconButton component={RouterLink} to={appRoutes.wishlist}>
              <FavoriteBorderIcon
                fontSize={!isMobile ? "large" : "medium"}
                sx={{ color: theme.ButtonCard }}
              />
            </IconButton>
            <IconButton component={RouterLink} to={appRoutes.cart}>
              <ShoppingCartOutlinedIcon
                fontSize={!isMobile ? "large" : "medium"}
                sx={{ color: theme.ButtonCard }}
              />
            </IconButton>
            <IconButton component={RouterLink} to={appRoutes.auth.login}>
              <PersonOutlineIcon
                fontSize={!isMobile ? "large" : "medium"}
                sx={{ color: theme.ButtonCard }}
              />
            </IconButton>

            {/* Mobile Search */}
            {isMobile && (
              <IconButton onClick={() => setSearchOpen((p) => !p)}>
                {searchOpen ? (
                  <CloseIcon sx={{ color: theme.ButtonCard }} />
                ) : (
                  <SearchIcon sx={{ color: theme.ButtonCard }} />
                )}
              </IconButton>
            )}

            {/* Mobile Menu */}
            {isMobile && (
              <IconButton onClick={() => setMenuOpen((p) => !p)}>
                {menuOpen ? (
                  <CloseIcon sx={{ color: theme.ButtonCard }} />
                ) : (
                  <MenuIcon sx={{ color: theme.ButtonCard }} />
                )}
              </IconButton>
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
              gap: 1.5,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <InputBase
              autoFocus
              placeholder="What are you looking for?"
              sx={{
                flex: 1,
                fontSize: 14,
                color: theme.ButtonCard,
                fontFamily: theme.font,
              }}
            />
            <IconButton onClick={() => setSearchOpen(false)}>
              <CloseIcon sx={{ color: theme.ButtonCard }} />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Mobile Menu */}
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
              gap: 3,
              boxShadow: 24,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => setMenuOpen(false)}
            >
              <CloseIcon sx={{ color: theme.ButtonCard }} />
            </IconButton>

            {navLinks.map((item) => (
              <Link
                key={item.label}
                component={RouterLink}
                to={item.path}
                underline="none"
                sx={{
                  color: theme.Text1,
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: theme.font,
                  textAlign: "center",
                  "&:hover": { color: theme.ButtonCard },
                }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Header;
