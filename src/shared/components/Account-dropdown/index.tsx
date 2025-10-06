import React from "react";
import { Box, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  AccountCircleOutlined,
  FavoriteBorder,
  ShoppingBagOutlined,
  LoginOutlined,
  PersonAddAltOutlined,
} from "@mui/icons-material";
import { appRoutes } from "../../../routes";
// import "./AccountDropdown.css"; // includes .glass-card

interface AccountDropdownProps {
  open: boolean;
  theme: any;
  isMobile: boolean;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({
  open,
  theme,
  isMobile,
}) => {
  const menuItems = [
    { label: "My Account", to: "", icon: <AccountCircleOutlined /> },
    { label: "Orders", to: "", icon: <ShoppingBagOutlined /> },
    { label: "Wishlist", to: appRoutes.wishlist, icon: <FavoriteBorder /> },
    { label: "Login", to: appRoutes.auth.login, icon: <LoginOutlined /> },
    {
      label: "Register",
      to: appRoutes.auth.signUp,
      icon: <PersonAddAltOutlined />,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: "8px",
            zIndex: 1500,
          }}
        >
          <Box
            className="glass-card"
            sx={{
              width: 240,
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              p: 2,
              gap: 1,
              backdropFilter: "blur(9px)",
              WebkitBackdropFilter: "blur(9px)",
              ...(isMobile && {
                right: "50%",
                transform: "translateX(50%)",
                width: "80vw",
              }),
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {menuItems.map((item) => (
              <Link
                key={item.label}
                component={RouterLink}
                to={item.to}
                underline="none"
                sx={{
                  color: theme.primary1,
                  fontSize: 14,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  transition: "color 0.2s ease",
                  "&:hover": { color: theme.HoverButton },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.2rem",
                    color: theme.primary1,
                  }}
                >
                  {item.icon}
                </Box>
                {item.label}
              </Link>
            ))}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountDropdown;
