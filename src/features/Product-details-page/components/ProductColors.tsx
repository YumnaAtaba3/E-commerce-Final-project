import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface ProductColorsProps {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
}

const ProductColors: React.FC<ProductColorsProps> = ({
  colors,
  selected,
  onSelect,
}) => {
  const { theme } = useTheme();

  return (
    <Box mb={3} display="flex" alignItems="center" gap={2} color={theme.Text1}>
      <Typography fontWeight={500} fontSize={16}>
        Colours:
      </Typography>
      <Box display="flex" gap={1}>
        {colors.map((c) => {
          const isSelected = selected === c;
          return (
            <Box
              key={c}
              onClick={() => onSelect(c)}
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: isSelected
                  ? `3px solid ${theme.Text1}`
                  : "2px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  border: `3px solid ${theme.Text1}`,
                },
              }}
            >
              {isSelected && (
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    bgcolor: c,
                  }}
                />
              )}
              {!isSelected && (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    bgcolor: c,
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProductColors;
