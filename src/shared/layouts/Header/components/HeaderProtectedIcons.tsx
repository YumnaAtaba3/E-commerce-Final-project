/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Box, IconButton, Badge } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link as RouterLink } from "react-router-dom";

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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        visibility: isLoggedIn ? "visible" : "hidden",
      }}
    >
      {/* Wishlist */}
      <IconButton component={RouterLink} to={appRoutes.wishlist}>
        <Badge badgeContent={wishlist.length} color="secondary">
          <FavoriteBorderIcon sx={{ color: theme.Text1 }} />
        </Badge>
      </IconButton>

      {/* Cart */}
      <IconButton component={RouterLink} to={appRoutes.cart}>
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCartOutlinedIcon sx={{ color: theme.Text1 }} />
        </Badge>
      </IconButton>

      {/* Account */}
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setAccountOpen((prev) => !prev);
          }}
        >
          <PersonOutlineIcon sx={{ color: theme.Text1 }} />
        </IconButton>
        <AccountDropdown open={accountOpen} theme={theme} isMobile={false} />
      </Box>
    </Box>
  );
};

export default HeaderProtectedIcons;
