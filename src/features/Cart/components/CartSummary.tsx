import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigate } from "react-router";
import { appRoutes } from "../../../routes";

interface Props {
  subtotal: number;
  discount: number; // discount in percentage
  isMobile: boolean;
}

const CartSummary: React.FC<Props> = ({ subtotal, discount, isMobile }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const discountedTotal = subtotal * (1 - discount / 100);

  return (
    <Box
      sx={{
        color: theme.Text1,
        border: `1px solid ${theme.Text1}`,
        p: { xs: 2, md: 4 },
        borderRadius: 2,
        boxShadow: "0px 6px 24px rgba(0,0,0,0.08)",
        width: "100%",
        minWidth: isMobile ? { xs: "100%", md: 400 } : { xs: "100%", md: 500 },
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: `0px 8px 30px ${theme.Button2}50`,
          transform: "translateY(-6px)",
        },
      }}
    >
      <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 600, mb: 3 }}>
        Cart Total
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>Subtotal:</Typography>
        <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
          ${subtotal.toFixed(2)}
        </Typography>
      </Box>

      {discount > 0 && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
            Discount ({discount}%):
          </Typography>
          <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
            -${(subtotal * (discount / 100)).toFixed(2)}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          borderTop: `1px solid ${theme.borderColor}`,
          pt: 2,
        }}
      >
        <Typography sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 500 }}>
          Total:
        </Typography>
        <Typography sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 500 }}>
          ${discountedTotal.toFixed(2)}
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: theme.Button2,
          color: theme.bgColor,
          textTransform: "none",
          fontSize: { xs: 14, md: 16 },
          py: { xs: 1, md: 1.5 },
          "&:hover": { bgcolor: theme.Button2 },
        }}
        onClick={() => navigate(appRoutes.checkout)}
      >
        Proceed to checkout
      </Button>
    </Box>
  );
};

export default CartSummary;
