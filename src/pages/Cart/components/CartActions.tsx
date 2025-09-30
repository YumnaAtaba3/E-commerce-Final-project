import React from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

const CartActions: React.FC<{ isMobile: boolean }> = ({isMobile}) => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:  isMobile ? "space-around":"space-between",
        mt: 3,
        flexWrap: "wrap",
        gap: 2,
        minWidth: isMobile ? { xs: "100%", md: 40 } : { xs: "100%", md: 50 },
      }}
    >
      <Button
        variant="outlined"
        sx={{
          borderColor: theme.borderColor,
          color: theme.Text1,
          textTransform: "none",
          fontSize: isMobile ? 10 : 14,
          px: 3,
          "&:hover": { borderColor: theme.Button2, color: theme.Button2 },
        }}
      >
        Return To Shop
      </Button>

      <Button
        variant="outlined"
        sx={{
          borderColor: theme.borderColor,
          color: theme.Text1,
          textTransform: "none",
          fontSize: isMobile ? 10 : 14,
          px: 3,
          "&:hover": { borderColor: theme.Button2, color: theme.Button2 },
        }}
      >
        Update Cart
      </Button>
    </Box>
  );
};

export default CartActions;
