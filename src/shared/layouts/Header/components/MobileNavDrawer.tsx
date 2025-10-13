import React from "react";
import { Drawer, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion, type Variants, easeOut } from "framer-motion";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  navLinks: { label: string; to: string; icon: React.ReactNode }[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easeOut }, // ✅ use imported easeOut
  },
};

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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={open ? "visible" : "hidden"}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          {navLinks.map((link) => (
            <motion.div key={link.label} variants={itemVariants}>
              <Link
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
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Drawer>
  );
};

export default MobileNavDrawer;
