import React from "react";
import { motion } from "framer-motion";
import { Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../../../theme/ThemeProvider";

interface BreadcrumbProps {
  current: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ current }) => {
  const { theme } = useTheme();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{ px: { xs: 2, md: 12 }, py: 3, fontSize: 16, color: "#555" }}
    >
      <MuiLink component={Link} to="/" underline="hover" sx={{ color: "#555" }}>
        Home
      </MuiLink>{" "}
      / <span style={{ color: theme.Text1 }}>{current}</span>
    </Box>
  );
};

export default Breadcrumb;
