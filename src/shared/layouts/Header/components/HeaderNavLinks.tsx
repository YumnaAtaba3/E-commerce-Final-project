/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Link } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { appRoutes } from "../../../../routes";

interface HeaderNavLinksProps {
  isMobile: boolean;
  theme: any;
}

const navLinks = [
  { label: "Home", to: appRoutes.home },
  { label: "About", to: appRoutes.about },
  { label: "Contact", to: appRoutes.contact },
  { label: "Sign Up", to: appRoutes.auth.signUp },
];

const HeaderNavLinks: React.FC<HeaderNavLinksProps> = ({ isMobile, theme }) => {
  const location = useLocation();
  if (isMobile) return null;

  return (
    <Box sx={{ display: "flex", gap: 4 }}>
      {navLinks.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.to}
            underline="none"
            sx={{
              fontSize: 14,
              fontWeight: 500,
              fontFamily: theme.font,
              color: isActive ? theme.HoverButton : theme.Text1,
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </Box>
  );
};

export default HeaderNavLinks;
