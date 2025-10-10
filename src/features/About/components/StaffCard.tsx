import React from "react";
import { Box, Card, Typography, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "../../../theme/ThemeProvider";

import twitter from "../../../assets/Footer/Icon-Twitter.svg";
import instagram from "../../../assets/Footer/icon-instagram.svg";
import linkedin from "../../../assets/Footer/Icon-Linkedin.svg";

interface StaffCardProps {
  img: string;
  name: string;
  role: string;
}

const StaffCard: React.FC<StaffCardProps> = ({ img, name, role }) => {
  const { theme } = useTheme();

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        borderRadius: 4,
        maxWidth: 380,
        p: 3,
        bgcolor: theme.primary1,
        boxShadow:
          "0px 8px 20px rgba(0,0,0,0.08), 0px 4px 10px rgba(0,0,0,0.05)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.4s ease",
        "&:hover": {
          boxShadow: "0px 12px 35px rgba(255, 100, 0, 0.4)",
          transform: "translateY(-6px)",
        },
      }}
    >
      {/* Image */}
      <Box
        component={motion.img}
        src={img}
        alt={name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          width: "100%",
          height: 360,
          objectFit: "cover",
          borderRadius: 3,
          mb: 2.5,
          filter: "brightness(1)",
          transition: "filter 0.4s ease",
          "&:hover": {
            filter: "brightness(1.05)",
          },
        }}
      />

      {/* Name and Role */}
      <Typography
        component={motion.p}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          fontWeight: 700,
          fontSize: 20,
          color: theme.Text1,
          letterSpacing: 0.4,
        }}
      >
        {name}
      </Typography>

      <Typography
        component={motion.p}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        sx={{
          color: theme.Text2,
          fontSize: 15,
          mb: 2.5,
        }}
      >
        {role}
      </Typography>

      {/* Social Icons */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          justifyContent: "center",
          mt: "auto",
        }}
      >
        {[twitter, instagram, linkedin].map((icon, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <IconButton
              sx={{
                p: 1.2,
                bgcolor: "transparent",
                border: `1px solid ${theme.Button2}`,
                borderRadius: "50%",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: theme.Button2,
                  transform: "translateY(-3px)",
                },
              }}
            >
              <Box
                component="img"
                src={icon}
                alt={`social-icon-${i}`}
                sx={{
                  width: 20,
                  height: 20,
                  filter:
                    theme.mode === "light"
                      ? "invert(1)"
                      : "invert(0) brightness(2)",
                  transition: "filter 0.3s ease",
                }}
              />
            </IconButton>
          </motion.div>
        ))}
      </Box>
    </Card>
  );
};

export default StaffCard;
