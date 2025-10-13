import React from "react";
import { Box, Typography } from "@mui/material";
import { motion, type Variants, easeOut } from "framer-motion";
import { useTheme } from "../../../theme/ThemeProvider";

interface FeatureCardProps {
  icon: string;
  title: string;
  text: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, text }) => {
  const { theme } = useTheme();

 
  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }, 
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariant}
      whileHover={{ scale: 1.05, y: -6 }}
      style={{ display: "inline-block", width: "100%" }}
    >
      <Box
        sx={{
          textAlign: "center",
          borderRadius: 3,
          py: 6,
          px: 3,
          transition: "0.3s",
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            bgcolor: "gray",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0px 8px 16px rgba(128,128,128,0.5), 0px 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={icon}
              sx={{ width: 25, bgcolor: "black", borderRadius: "50%" }}
            />
          </Box>
        </Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            mb: 1,
            textTransform: "uppercase",
            color: theme.Text1,
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: theme.Text1, fontSize: 14 }}>
          {text}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default FeatureCard;
