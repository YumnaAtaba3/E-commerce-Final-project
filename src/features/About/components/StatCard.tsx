import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface StatCardProps {
  icon: string;
  value: string;
  text: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, text }) => {
  const { theme } = useTheme();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      sx={{
        textAlign: "center",
        p: 4,
        width: 250,
        borderRadius: 4,
        bgcolor: theme.primary1,
        boxShadow:
          "0px 8px 20px rgba(0,0,0,0.05), 0px 4px 10px rgba(0,0,0,0.05)",
        cursor: "pointer",
        transformOrigin: "center",
        transition: "all 0.4s ease",
        "&:hover": {
          bgcolor: theme.Button2,
          boxShadow: "0px 12px 35px rgba(0,0,0,0.25)",
          transform: "translateY(-6px)",
          "& .inner-circle": {
            bgcolor: "#fff",
            transform: "scale(1.1)",
            "& img": { filter: "invert(0)" },
          },
          "& .value, & .text": { color: "#fff" },
        },
      }}
    >
      {/* Icon Halo */}
      <Box
        className="circle-halo"
        sx={{
          width: 70,
          height: 70,
          mx: "auto",
          mb: 2.5,
          borderRadius: "50%",
          bgcolor: theme.disabledText,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0px 10px 20px rgba(128,128,128,0.25), 0px 6px 12px rgba(0,0,0,0.05)",
          transition: "0.4s ease",
        }}
      >
        <Box
          component={motion.div}
          className="inner-circle"
          whileHover={{ rotate: 10 }}
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            bgcolor: theme.Text1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.4s ease",
            "& img": {
              width: 28,
              filter: theme.mode === "light" ? "invert(1)" : "invert(0)",
              transition: "filter 0.4s ease",
            },
          }}
        >
          <Box component="img" src={icon} alt={text} />
        </Box>
      </Box>

      {/* Animated Text */}
      <Typography
        component={motion.p}
        className="value"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          fontWeight: 700,
          fontSize: 28,
          mb: 0.5,
          color: theme.Text1,
          letterSpacing: 0.5,
        }}
      >
        {value}
      </Typography>

      <Typography
        component={motion.p}
        className="text"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        sx={{
          fontSize: 14,
          fontWeight: 400,
          color: theme.Text1,
          opacity: 0.9,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default StatCard;
