import React from "react";
import { Drawer, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  navLinks: { label: string; to: string; icon: React.ReactNode }[];
}

const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  open,
  onClose,
  navLinks,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "70vw",
          bgcolor: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          p: 3,
          pt: 15,
        },
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            component={RouterLink}
            to={link.to}
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              fontSize: 16,
              fontWeight: 500,
              color: "#f5f5f5",
              py: 1,
              px: 1.5,
              borderRadius: 1.5,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.08)",
                transform: "translateX(3px)",
              },
            }}
            onClick={onClose}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </Box>
    </Drawer>
  );
};

export default MobileNavDrawer;
