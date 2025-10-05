import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface BreadcrumbProps {
  current: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ current }) => {
  const { theme } = useTheme();

  return (
    <Box sx={{ px: { xs: 2, md: 12 }, py: 3, fontSize: 12, color: "#555" }}>
      Home /{" "}
      <span style={{ color: theme.Text1, fontWeight: 600 }}>{current}</span>
    </Box>
  );
};

export default Breadcrumb;
