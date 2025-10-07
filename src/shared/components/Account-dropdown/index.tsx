/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Link, IconButton, Tooltip } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  AccountCircleOutlined,
  ShoppingBagOutlined,
  CancelOutlined,
  LogoutOutlined,
  StarBorder,
  DarkModeOutlined,
  LightModeOutlined,
} from "@mui/icons-material";
import { useTheme } from "../../../theme/ThemeProvider"; 

import "./AccountDropdown.css";

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
  const { toggleTheme, isDark } = useTheme(); // 👈 get theme state + toggler

  const menuItems = [
    {
      label: "Manage My Account",
      to: "",
      icon: <AccountCircleOutlined sx={{ fontSize: 22 }} />,
    },
    {
      label: "My Orders",
      to: "",
      icon: <ShoppingBagOutlined sx={{ fontSize: 22 }} />,
    },
    {
      label: "My Cancellations",
      to: "",
      icon: <CancelOutlined sx={{ fontSize: 22 }} />,
    },
    {
      label: "My Reviews",
      to: "",
      icon: <StarBorder sx={{ fontSize: 22 }} />,
    },
    {
      label: "Logout",
      to: "",
      icon: <LogoutOutlined sx={{ fontSize: 22 }} />,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
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
              width: 250,
              p: 2.2,
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              gap: 1.2,
              ...(isMobile && {
                right: "50%",
                transform: "translateX(50%)",
                width: "50vw",
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
                  color: "#f5f5f5",
                  fontSize: isMobile ? 12 : 15,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 0.7,
                  px: 1,
                  borderRadius: "10px",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    color: theme?.HoverButton || "#ffffff",
                    transform: "translateX(3px)",
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    opacity: 0.9,
                  }}
                >
                  {item.icon}
                </Box>
                {item.label}
              </Link>
            ))}

            {/* 🌗 Theme Toggle Button */}
            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                pt: 1,
              }}
            >
              <Tooltip title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}>
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: "#fff",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: theme?.HoverButton || "#90caf9",
                    },
                  }}
                >
                  {isDark ? (
                    <LightModeOutlined fontSize="large" />
                  ) : (
                    <DarkModeOutlined fontSize="large" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountDropdown;
