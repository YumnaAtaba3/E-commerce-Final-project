import React from "react";
import { Box, Button } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface Props {
  isMobile: boolean;
  returnToShop?: () => void;
}

const CartActions: React.FC<Props> = ({ isMobile, returnToShop }) => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 3,
        flexWrap: "wrap",
        gap: isMobile?2:112,
      }}
    >
      <Button
        variant="outlined"
        sx={{
          borderColor: theme.borderColor,
          color: theme.Text1,
          textTransform: "none",
          fontSize: isMobile ? 12 : 14,
          px: 3,
          "&:hover": { borderColor: theme.Button2, color: theme.Button2 },
        }}
        onClick={returnToShop}
      >
        Return To Shop
      </Button>

      <Button
        variant="outlined"
        sx={{
          borderColor: theme.borderColor,
          color: theme.Text1,
          textTransform: "none",
          fontSize: isMobile ? 12 : 14,
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
