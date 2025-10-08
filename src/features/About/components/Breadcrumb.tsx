import React from "react";
import { Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../../../theme/ThemeProvider";

interface BreadcrumbProps {
  current: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ current }) => {
  const { theme } = useTheme();

  return (
    <Box sx={{ px: { xs: 2, md: 12 }, py: 3, fontSize: 16, color: "#555" }}>
      <MuiLink
        component={Link}
        to="/"
        underline="hover"
        sx={{ color: "#555", fontWeight: 600, cursor: "pointer" }}
      >
        Home
      </MuiLink>{" "}
      / <span style={{ color: theme.Text1, fontWeight: 600 }}>{current}</span>
    </Box>
  );
};

export default Breadcrumb;
