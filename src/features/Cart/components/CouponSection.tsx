import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import { toast } from "react-toastify";

interface Props {
  isMobile: boolean;
  setDiscountPercent: (discount: number) => void; // callback to set discount
}

const CouponSection: React.FC<Props> = ({ isMobile, setDiscountPercent }) => {
  const { theme } = useTheme();
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    switch (code) {
      case "SAVE10":
        setDiscountPercent(10);
        toast.success("Coupon applied! 10% off", {
          className: "toast-success",
        });
        break;
      case "SAVE20":
        setDiscountPercent(20);
        toast.success("Coupon applied! 20% off",{className:"toast-success"});
        break;
      case "SAVE30":
        setDiscountPercent(30);
        toast.success("Coupon applied! 30% off", {
          className: "toast-success",
        });
        break;
      case "SAVE50":
        setDiscountPercent(50);
        toast.success("Coupon applied! 50% off", {
          className: "toast-success",
        });
        break;
      default:
        setDiscountPercent(0);
        toast.error("Invalid coupon code",{className:"toast-error"});
        break;
    }
  };

  return (
    <Box
      sx={{
        mt: 6,
        display: "flex",
        gap: 3,
        flexWrap: isMobile ? "wrap" : "nowrap",
        pr: isMobile ? 0 : 30,
        justifyContent: isMobile ? "center" : "flex-start",
        mx: isMobile ? "auto" : 0,
        width: isMobile ? "70%" : "auto",
        maxWidth: isMobile ? 360 : "none",
      }}
    >
      <TextField
        label="Coupon Code"
        placeholder="Enter Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        variant="outlined"
        sx={{
          flex: "1 1 auto",
          minWidth: { xs: "100%", sm: "260px" },
          maxWidth: { sm: 300 },
          "& .MuiOutlinedInput-root": {
            height: 50,
            "& fieldset": { borderColor: theme.Text1 },
            "&:hover fieldset": { borderColor: theme.Button2 },
            "&.Mui-focused fieldset": { borderColor: theme.Button2 },
          },
          "& .MuiInputLabel-root": {
            fontSize: "1rem",
            color: theme.borderColor,
            transition: "all 0.2s",
          },
          "&:hover .MuiInputLabel-root": { color: theme.Button2 },
          "& .MuiInputLabel-root.Mui-focused": { color: theme.Button2 },
        }}
      />
      <Button
        variant="contained"
        sx={{
          bgcolor: theme.Button2,
          color:"white",
          textTransform: "none",
          fontSize: 14, 
          px: 6,
          height: 50,
          whiteSpace: "nowrap",
          "&:hover": { bgcolor: theme.Button2 },
        }}
        onClick={handleApplyCoupon}
      >
        Apply Coupon
      </Button>
    </Box>
  );
};

export default CouponSection;
