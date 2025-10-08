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

  // Free shipping threshold
  const freeShippingThreshold = 50; // e.g., orders over $50
  const shippingCost = subtotal > 0 && subtotal < freeShippingThreshold ? 5 : 0; // $5 shipping if below threshold
  const shippingLabel =
    shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`;

  const discountedTotal = subtotal * (1 - discount / 100) + shippingCost;

  return (
    <Box
      sx={{
      
        color: theme.Text1,
        border: `1px solid ${theme.Text1}`,
        p: { xs: 2, md: 4 },
        borderRadius: 2,
        boxShadow: "0px 6px 24px rgba(0,0,0,0.08)",
        width: "100%",
        minWidth: isMobile ? { xs: "100%", md: 100 } : { xs: "100%", md: 150 },
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

      {/* Subtotal */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>Subtotal:</Typography>
        <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
          ${subtotal.toFixed(2)}
        </Typography>
      </Box>

      {/* Discount */}
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

      {/* Shipping */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>Shipping:</Typography>
        <Typography
          sx={{
            fontSize: { xs: 14, md: 16 },
          }}
        >
          {shippingLabel}
        </Typography>
      </Box>

      {/* Divider */}
      <Box
        sx={{
          borderTop: `1px solid ${theme.borderColor}`,
          width: "100%",
          my: 2,
        }}
      />

      {/* Total */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 500 }}>
          Total:
        </Typography>
        <Typography sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 500 }}>
          ${discountedTotal.toFixed(2)}
        </Typography>
      </Box>

      <Button
        variant="contained"
        sx={{
          width: { xs: 180, md: 220 }, // responsive width: smaller on mobile, bigger on desktop
          mx: "auto", // centers the button horizontally
          display: "block", // ensures mx works
          bgcolor: theme.Button2,
          color: theme.bgColor,
          textTransform: "none",
          fontSize: { xs: 14, md: 16 },
          py: { xs: 1, md: 1.5 },
          px: 0.5,
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
