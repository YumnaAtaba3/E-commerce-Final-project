import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../../../theme/ThemeProvider";

const ContactBreadcrumb: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.primary1,
        py: 3,
        px: { xs: 2, md: 10 },
      }}
    >
      <Typography sx={{ color: theme.Text1, fontSize: 16 }}>
        <MuiLink
          component={Link}
          to="/"
          underline="hover"
          sx={{ color: theme.Text1, fontWeight: 500, cursor: "pointer" }}
        >
          Home
        </MuiLink>{" "}
        /{" "}
        <Box component="span" sx={{ fontWeight: 500 }}>
          Contact
        </Box>
      </Typography>
    </Box>
  );
};

export default ContactBreadcrumb;
