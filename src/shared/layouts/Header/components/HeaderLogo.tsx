/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { appRoutes } from "../../../../routes";

interface HeaderLogoProps {
  isMobile: boolean;
  theme: any;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ isMobile, theme }) => (
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
);

export default HeaderLogo;
