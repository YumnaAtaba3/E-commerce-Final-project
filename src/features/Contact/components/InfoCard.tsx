import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "../../../theme/ThemeProvider";

interface InfoCardProps {
  icon: string;
  alt: string;
  title: string;
  lines: string[];
  borderTop?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  alt,
  title,
  lines,
  borderTop,
}) => {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 120 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderTop: borderTop ? `1px solid ${theme.borderColor}` : "none",
          pt: borderTop ? 4 : 0,
          mb: 4,
          pb: 0.7,
          bgcolor: theme.primary1,
          transition: "0.3s ease",
        }}
      >
        {/* Icon + Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 1,
            color: theme.Text1,
          }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: theme.Button2,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={icon}
                alt={alt}
                sx={{ width: 25, height: 25 }}
              />
            </Box>
          </motion.div>

          <Typography fontSize={18} fontWeight={600}>
            {title}
          </Typography>
        </Box>

        {/* Lines */}
        {lines.map((txt, i) => (
          <Typography
            key={i}
            fontSize={14}
            mt={0.5}
            sx={{ color: theme.Text1, mb: 1 }}
          >
            {txt}
          </Typography>
        ))}
      </Box>
    </motion.div>
  );
};

export default InfoCard;
