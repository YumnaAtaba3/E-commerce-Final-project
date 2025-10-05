import { Paper, Box } from "@mui/material";
import React from "react";

interface Props {
  gridCols: string;
  isMobile:boolean
}

const CartHeader: React.FC<Props> = ({ gridCols,isMobile }) => (
  <Paper
    sx={{
      mb: 3,
      px: 4,
      py: 1.5,
      width: "100%",
      minWidth: isMobile?500:700,
      mx: "auto",
      display: "grid",
      gridTemplateColumns: gridCols,
      alignItems: "center",
      justifyItems: "center", 
     
      gap: 18,
      
      fontSize: 16,
      border: "1px solid #e0e0e0",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
    }}
  >
    <Box justifySelf={"start"}>Product</Box>
    <Box>Price</Box>
    <Box>Quantity</Box>
    <Box>Subtotal</Box>
  </Paper>
);

export default CartHeader;
