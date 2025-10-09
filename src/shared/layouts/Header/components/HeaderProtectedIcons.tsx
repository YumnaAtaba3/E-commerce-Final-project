/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, Badge } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { appRoutes } from "../../../../routes";
import AccountDropdown from "../../../components/Account-dropdown";

interface HeaderProtectedIconsProps {
  theme: any;
  isLoggedIn: boolean;
  cart: any[];
  wishlist: any[];
  isMobile?: boolean;
  iconColor?: string;
  hoverBg?: string;
  badgeColor?: string;
}

const iconStylesConfig = {
  iconButton: (theme: any, hoverBg?: string) => ({
    bgcolor: "transparent",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    "&:hover": {
      bgcolor: hoverBg || theme.Button2,
      color: "white",
    },
  }),

  badge: (theme: any, badgeColor?: string) => ({
    "& .MuiBadge-badge": {
      bgcolor: badgeColor || theme.Button2,
      color: "white",
      fontWeight: 600,
    },
  }),

  icon: (theme: any, iconColor?: string) => ({
    fontSize: 20,
    color: iconColor || theme.Text1,
    transition: "color 0.3s ease",
    "&:hover": {
      color: "white",
    },
  }),
};

const HeaderProtectedIcons: React.FC<HeaderProtectedIconsProps> = ({
  theme,
  isLoggedIn,
  cart,
  wishlist,
  isMobile,
  iconColor,
  hoverBg,
  badgeColor,
}) => {
  const [accountOpen, setAccountOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const hideAllIconsPages =
    location.pathname === appRoutes.auth.signUp ||
    location.pathname === appRoutes.auth.login;


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iconButtonSx = iconStylesConfig.iconButton(theme, hoverBg);
  const badgeSx = iconStylesConfig.badge(theme, badgeColor);
  const iconSx = iconStylesConfig.icon(theme, iconColor);

  return (

  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
    {/* Wishlist */}
    <Box
      sx={{
        width: 40, // نفس عرض الايقونة تقريبا
        height: 40,
        display: hideAllIconsPages ? "inline-block" : "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!hideAllIconsPages && (
        <IconButton component={RouterLink} to={appRoutes.wishlist} sx={{ ...iconButtonSx, ...badgeSx }}>
          <Badge badgeContent={wishlist.length} color="secondary">
            <FavoriteBorderIcon sx={iconSx} />
          </Badge>
        </IconButton>
      )}
    </Box>

    {/* Cart */}
    <Box
      sx={{
        width: 40,
        height: 40,
        display: hideAllIconsPages ? "inline-block" : "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!hideAllIconsPages && (
        <IconButton component={RouterLink} to={appRoutes.cart} sx={{ ...iconButtonSx, ...badgeSx }}>
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartOutlinedIcon sx={iconSx} />
          </Badge>
        </IconButton>
      )}
    </Box>

    {/* Account */}
    <Box
      sx={{
        width: 40,
        height: 40,
        display: hideAllIconsPages || !isLoggedIn ? "inline-block" : "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
      ref={dropdownRef}
    >
      {!hideAllIconsPages && isLoggedIn && (
        <>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setAccountOpen((prev) => !prev);
            }}
            sx={iconButtonSx}
          >
            <PersonOutlineIcon sx={iconSx} />
          </IconButton>
          <AccountDropdown open={accountOpen} theme={theme} isMobile={!!isMobile} />
        </>
      )}
    </Box>
  </Box>
);

};

export default HeaderProtectedIcons;
