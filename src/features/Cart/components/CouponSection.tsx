import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface Props {
  isMobile: boolean;
  setDiscountPercent: (discount: number) => void; // callback to set discount
}

const CouponSection: React.FC<Props> = ({ isMobile, setDiscountPercent }) => {
  const { theme } = useTheme();
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (code === "SAVE10") setDiscountPercent(10);
    else if (code === "SAVE20") setDiscountPercent(20);
    else {
      setDiscountPercent(0);
      alert("Invalid coupon code");
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        gap: 3,
        flexWrap: "wrap",
        pr: isMobile ? 0 : 40,
        justifyContent: isMobile ? "center" : "start",
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
          color: theme.primary1,
          textTransform: "none",
          fontSize: 14,
          px: 4,
          height: 50,
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
