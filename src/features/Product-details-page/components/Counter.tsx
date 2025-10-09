import React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTheme } from "../../../theme/ThemeProvider";

interface CounterProps {
  quantity: number;
  onChange: (type: "inc" | "dec") => void;
}

const Counter: React.FC<CounterProps> = ({ quantity, onChange }) => {
  const { theme } = useTheme();

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <Button
        onClick={() => onChange("dec")}
        sx={{
          minWidth: 40,
          height: 40,
          border: "1px solid #ddd",
          borderRadius: "4px 0 0 4px",
          color: theme.Text1,
        }}
      >
        <RemoveIcon />
      </Button>
      <Box
        sx={{
          width: 60,
          height: 40,
          borderTop: "1px solid #ddd",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {quantity}
      </Box>
      <Button
        onClick={() => onChange("inc")}
        sx={{
          minWidth: 40,
          height: 40,
          border: "1px solid #ddd",
          borderRadius: "0 4px 4px 0",
          color: "white",
          bgcolor: theme.Button2,
        }}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};

export default Counter;
