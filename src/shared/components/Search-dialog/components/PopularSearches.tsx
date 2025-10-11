import React from "react";
import { Box, Chip } from "@mui/material";
import { useTheme as useAppTheme } from "../../../../theme/ThemeProvider";
import { motion } from "framer-motion";

interface PopularSearchesProps {
  onClick: (term: string) => void;
}

const popularSearches = [
  "PlayStation",
  "Modern",
  "Shirt",
  "Bluetooth Speaker",
  "Classic",
];

const PopularSearches: React.FC<PopularSearchesProps> = ({ onClick }) => {
  const { theme } = useAppTheme();

  // Container animation — staggered entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  // Each chip animation — smooth float-in
  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ overflow: "hidden" }}
    >
      <Box display="flex" gap={1} flexWrap="wrap" mb={2} justifyContent="start">
        {popularSearches.map((term, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{
              scale: 1.08,
              rotate: 2,
              boxShadow: `0 0 10px ${theme.Button2}`,
              transition: { duration: 0.25 },
            }}
            whileTap={{
              scale: 0.92,
              rotate: -2,
              transition: { duration: 0.15 },
            }}
          >
            <Chip
              label={term}
              onClick={() => onClick(term)}
              sx={{
                cursor: "pointer",
                bgcolor: theme.Button2,
                color: "white",
                fontSize: 14,
                fontWeight: 500,
                borderRadius: "12px",
                px: 1,
                "&:hover": {
                  bgcolor: theme.Button2,
                },
              }}
            />
          </motion.div>
        ))}
      </Box>
    </motion.div>
  );
};

export default PopularSearches;
