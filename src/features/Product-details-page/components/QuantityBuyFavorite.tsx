import React from "react";
import { Box, Button } from "@mui/material";
import FavoriteButton from "./FavoriteButton";
import Counter from "./Counter";
import { useTheme } from "../../../theme/ThemeProvider";

interface Props {
  quantity: number;
  onQuantityChange: (type: "inc" | "dec") => void;
  favorite: boolean;
  onFavoriteToggle: () => void;
}

const QuantityBuyFavorite: React.FC<Props> = ({
  quantity,
  onQuantityChange,
  favorite,
  onFavoriteToggle,
}) => {
  const { theme } = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      mb={4}
      color={theme.Text1}
      width="100%"
    >
      <Counter quantity={quantity} onChange={onQuantityChange} />
      <Button
        variant="contained"
        sx={{
          bgcolor: "#DB4444",
          px: 5,
          py: 1,
          borderRadius: 1,
          fontSize: 14,
          "&:hover": { bgcolor: "#c73a3a" },
        }}
      >
        Buy Now
      </Button>
      <FavoriteButton favorite={favorite} onClick={onFavoriteToggle} />
    </Box>
  );
};

export default QuantityBuyFavorite;
