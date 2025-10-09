import React from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface ProductSizesProps {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}

const ProductSizes: React.FC<ProductSizesProps> = ({
  sizes,
  selected,
  onSelect,
}) => {
  const { theme } = useTheme();
  return (
    <Box mb={3} display="flex" alignItems="center" gap={2} color={theme.Text1}>
      <Typography fontWeight={600} fontSize={16}>
        Size:
      </Typography>
      <ToggleButtonGroup
        value={selected}
        exclusive
        onChange={(_, val) => val && onSelect(val)}
        sx={{ gap: 1 }}
      >
        {sizes.map((s) => (
          <ToggleButton
            key={s}
            value={s}
            sx={{
              width: 40,
              height: 32,
              fontSize: 13,
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontWeight: 500,
              color:theme.Text1,
              "&:hover": { bgcolor: theme.Button2, color: "#fff" },
              "&.Mui-selected": {
                bgcolor: theme.Button2,
                color: "#fff",
                border: `1px solid ${theme.Button2}`,
              },
            }}
          >
            {s}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default ProductSizes;
