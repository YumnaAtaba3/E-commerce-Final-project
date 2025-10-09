/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Link } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { appRoutes } from "../../../../routes";

interface HeaderNavLinksProps {
  isMobile: boolean;
  theme: any;
}


const navLinkStyles = {
  container: {
    display: "flex",
    gap: 4,
  },

  link: (theme: any, isActive: boolean) => ({
    position: "relative",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: theme.font,
    color: isActive ? theme.HoverButton : theme.Text1,
    textDecoration: "none",
    pb: 0.5,
    transition: "all 0.3s ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      width: isActive ? "100%" : "0%",
      height: "2px",
      backgroundColor: theme.Text1, 
      transition: "width 0.3s ease",
    },

    "&:hover": {
      color: theme.HoverButton,
    },

    "&:hover::after": {
      width: "100%",
    },
  }),
};

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
    <Box sx={navLinkStyles.container}>
      {navLinks.map((item) => {
        const isActive = location.pathname === item.to;

        return (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.to}
            sx={navLinkStyles.link(theme, isActive)}
          >
            {item.label}
          </Link>
        );
      })}
    </Box>
  );
};

export default HeaderNavLinks;
