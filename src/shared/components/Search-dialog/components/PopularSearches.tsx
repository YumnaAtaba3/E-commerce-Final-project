// src/components/Search/components/PopularSearches.tsx
import React from "react";
import { Box, Chip } from "@mui/material";
import { useTheme as useAppTheme } from "../../../../theme/ThemeProvider";

interface PopularSearchesProps {
  onClick: (term: string) => void;
}

const popularSearches = ["PlayStation", "Parfum", "Shirt", "Bluetooth Speaker"];

const PopularSearches: React.FC<PopularSearchesProps> = ({ onClick }) => {
  const { theme } = useAppTheme();

  return (
    <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
      {popularSearches.map((term, idx) => (
        <Chip
          key={idx}
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
      ))}
    </Box>
  );
};

export default PopularSearches;
