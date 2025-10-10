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
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
        {popularSearches.map((term, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Chip
              label={term}
              onClick={() => onClick(term)}
              sx={{
                cursor: "pointer",
                bgcolor: theme.Button2,
                color: "white",
                fontSize: 14,
                "&:hover": { bgcolor: theme.Button2 },
              }}
            />
          </motion.div>
        ))}
      </Box>
    </motion.div>
  );
};

export default PopularSearches;
