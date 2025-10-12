import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNavigate, useLocation } from "react-router";
import { appRoutes } from "../../../routes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIsLoggedIn } from "../../auth/hooks/is-logged-in";
import { motion, easeOut, easeInOut } from "framer-motion";

interface Props {
  subtotal: number;
  discount: number;
  isMobile: boolean;
}

const CartSummary: React.FC<Props> = ({ subtotal, discount, isMobile }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isLoading } = useIsLoggedIn();

  const freeShippingThreshold = 50;
  const shippingCost = subtotal > 0 && subtotal < freeShippingThreshold ? 5 : 0;
  const shippingLabel =
    shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`;
  const discountedTotal = subtotal * (1 - discount / 100) + shippingCost;

  const handleCheckoutClick = () => {
    if (isLoading) return;

    if (!isLoggedIn) {
      toast.warning("You must log in first!", {
        className: "toast-warning",
        autoClose: 1500,
      });

      navigate(appRoutes.auth.signUp, { state: { from: location } });
      return;
    }

    navigate(appRoutes.checkout);
  };

  // Framer Motion variants (TypeScript-safe)
  const textVariant = (delay: number) => ({
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay, duration: 0.6, ease: easeOut },
    },
  });

  const MotionButton = motion(Button);

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
        overflow: "hidden",
      }}
    >
      <motion.div initial="hidden" animate="visible">
        <motion.div variants={textVariant(0.1)}>
          <Typography
            sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 600, mb: 1 }}
          >
            Cart Total
          </Typography>
        </motion.div>

        <motion.div variants={textVariant(0.3)}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
              Subtotal:
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
              ${subtotal.toFixed(2)}
            </Typography>
          </Box>
        </motion.div>

        {discount > 0 && (
          <motion.div variants={textVariant(0.5)}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
                Discount ({discount}%):
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
                -${(subtotal * (discount / 100)).toFixed(2)}
              </Typography>
            </Box>
          </motion.div>
        )}

        <motion.div variants={textVariant(0.7)}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
              Shipping:
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
              {shippingLabel}
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={textVariant(0.9)}>
          <Box
            sx={{
              borderTop: `1px solid ${theme.borderColor}`,
              width: "100%",
              my: 2,
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 500 }}>
              Total:
            </Typography>
            <Typography sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 500 }}>
              ${discountedTotal.toFixed(2)}
            </Typography>
          </Box>
        </motion.div>
      </motion.div>

      <Box textAlign="center">
        <MotionButton
          variant="contained"
          onClick={handleCheckoutClick}
          sx={{
            width: { xs: 180, md: 220 },
            mx: "auto",
            display: "block",
            bgcolor: theme.Button2,
            color: "white",
            textTransform: "none",
            fontSize: { xs: 14, md: 16 },
            py: { xs: 1, md: 1.5 },
            px: 0.5,
            "&:hover": { bgcolor: theme.Button2 },
            borderRadius: 1,
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: easeInOut,
          }}
        >
          Proceed to checkout
        </MotionButton>
      </Box>
    </Box>
  );
};

export default CartSummary;
