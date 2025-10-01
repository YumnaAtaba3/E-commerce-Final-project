import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  useMediaQuery,
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "../../theme/ThemeProvider";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";


import logo from "../../assets/Header/Logo.svg";

const Header: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = ["Home", "Contact", "About", "Sign Up"];

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          bgcolor: theme.primary1,
          color: theme.ButtonCard,
          borderBottom: `1px solid ${theme.Text2}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
          {/* Logo - smaller size */}
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              color:theme.Text1,
              height: { xs: 20, md: 22 }, // smaller logo on all screens
              cursor: "pointer",
              ml: !isMobile ? 10 : 0,
            }}
          />

          {/* Nav Links (desktop) */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 4 }}>
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href="#"
                  underline="none"
                  sx={{
                    color: item === "Sign Up" ? theme.Text1 : theme.Text1,
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: theme.font,
                    "&:hover": { color: theme.ButtonCard },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          )}

          {/* Search + Icons + Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Desktop Search (no border, flat style) */}
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

            {/* Icons - show on all screens */}
            <IconButton>
              <FavoriteBorderIcon
                fontSize={!isMobile ? "large" : "medium"}
                sx={{ color: theme.ButtonCard }}
              />
            </IconButton>
            <IconButton>
              <ShoppingCartOutlinedIcon
                fontSize={!isMobile ? "large" : "medium"}
                sx={{ color: theme.ButtonCard }}
              />
            </IconButton>
            <IconButton>
              <PersonOutlineIcon
                fontSize={!isMobile ? "large" : "medium"}
                sx={{ color: theme.ButtonCard }}
              />
            </IconButton>

            {/* Mobile Search Icon */}
            {isMobile && (
              <IconButton onClick={() => setSearchOpen((p) => !p)}>
                {searchOpen ? (
                  <CloseIcon sx={{ color: theme.ButtonCard }} />
                ) : (
                  <SearchIcon sx={{ color: theme.ButtonCard }} />
                )}
              </IconButton>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon sx={{ color: theme.ButtonCard }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Search Overlay */}
      {isMobile && searchOpen && (
        <Box
          sx={{
            bgcolor: theme.primary1,
            borderBottom: `1px solid ${theme.Text2}`,
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
          }}
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
        </Box>
      )}

      {/* Drawer / Slider for Mobile Nav */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 250,
            bgcolor: theme.primary1,
            color: theme.ButtonCard,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon sx={{ color: theme.ButtonCard }} />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((item) => (
            <ListItem
              button
              key={item}
              onClick={() => setDrawerOpen(false)}
              sx={{ "&:hover": { bgcolor: theme.borderColor } }}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: theme.font,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
