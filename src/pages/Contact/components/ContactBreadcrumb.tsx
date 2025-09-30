import React from "react";
import { Box, Typography } from "@mui/material";

const ContactBreadcrumb: React.FC = () => (
  <Box sx={{ bgcolor: "#fff", py: 3, px: { xs: 2, md: 10 } }}>
    <Typography sx={{ color: "#000", fontSize: 14 }}>
      Home /{" "}
      <Box component="span" sx={{ fontWeight: 500 }}>
        Contact
      </Box>
    </Typography>
  </Box>
);

export default ContactBreadcrumb;
