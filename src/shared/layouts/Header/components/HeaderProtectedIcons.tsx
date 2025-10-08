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
  cart: any;
  wishlist: any;
  isMobile?: boolean;
}

const HeaderProtectedIcons: React.FC<HeaderProtectedIconsProps> = ({
  theme,
  isLoggedIn,
  cart,
  wishlist,
}) => {
  const [accountOpen, setAccountOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // تحديد الصفحات التي يجب فيها إخفاء جميع الأيقونات
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

  const iconButtonStyles = {
    bgcolor: "transparent",
    "&:hover": {
      bgcolor: theme.Button2,
      color: "white",
    },
    borderRadius: "50%",
    transition: "all 0.3s ease",
  };

  const badgeStyles = {
    "& .MuiBadge-badge": {
      bgcolor: theme.Button2,
      color: "white",
      fontWeight: 600,
    },
  };

  const iconStyles = {
    fontSize: 20,
    color: theme.Text1,
    "&:hover": {
      color: "white",
    },
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      {/* Wishlist */}
      <Box
        sx={{
          visibility: hideAllIconsPages ? "hidden" : "visible",
        }}
      >
        <IconButton
          component={RouterLink}
          to={appRoutes.wishlist} 
          sx={{ ...iconButtonStyles, ...badgeStyles }}
        >
          <Badge badgeContent={wishlist.length} color="secondary">
            <FavoriteBorderIcon sx={iconStyles} />
          </Badge>
        </IconButton>
      </Box>

      {/* Cart */}
      <Box
        sx={{
          visibility: hideAllIconsPages ? "hidden" : "visible",
        }}
      >
        <IconButton
          component={RouterLink}
          to={appRoutes.cart} 
          sx={{ ...iconButtonStyles, ...badgeStyles }}
        >
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartOutlinedIcon sx={iconStyles} />
          </Badge>
        </IconButton>
      </Box>

      {/* Account */}
      <Box
        sx={{
          position: "relative",
          visibility: hideAllIconsPages || !isLoggedIn ? "hidden" : "visible",
        }}
        ref={dropdownRef}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setAccountOpen((prev) => !prev);
          }}
          sx={iconButtonStyles}
        >
          <PersonOutlineIcon sx={iconStyles} />
        </IconButton>
        <AccountDropdown open={accountOpen} theme={theme} isMobile={false} />
      </Box>
    </Box>
  );
};

export default HeaderProtectedIcons;
