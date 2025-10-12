import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import { useCouponLogic } from "../hooks/useCoupon";

interface Props {
  isMobile: boolean;
  setDiscountPercent: (discount: number) => void;
 
}

const CouponSection: React.FC<Props> = ({
  isMobile,
  setDiscountPercent,

}) => {
  const { theme } = useTheme();
  const { couponCode, setCouponCode, isCouponApplied, handleApplyCoupon } =
    useCouponLogic(setDiscountPercent);

  return (
    <Box
      sx={{
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
        disabled={isCouponApplied}
        variant="outlined"
        sx={{
          flex: "1 1 auto",
          minWidth: { xs: "100%", sm: "260px" },
          maxWidth: { sm: 300 },
          "& input": {
            color: theme.Text1,
            "&::placeholder": { color: theme.Text1 },
          },
          "& .MuiOutlinedInput-root": {
            height: 50,
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: theme.Button2 },
            "&.Mui-focused fieldset": { borderColor: theme.Button2 },
          },
          "& .MuiInputLabel-root": {
            fontSize: "16px",
            color: theme.borderColor,
            transition: "all 0.2s",
          },
          "&:hover .MuiInputLabel-root": { color: theme.Button2 },
          "& .MuiInputLabel-root.Mui-focused": { color: theme.Button2 },
          "&.Mui-disabled": {
            bgcolor: "gray",
            color: "white",
            opacity: 1,
          },
        }}
      />

      <Button
        onClick={handleApplyCoupon}
        variant="contained"
        disabled={isCouponApplied}
        sx={{
          bgcolor: theme.Button2,
          color: "white",
          textTransform: "none",
          fontSize: 14,
          px: 6,
          height: 50,
          whiteSpace: "nowrap",
          "&:hover": { bgcolor: theme.Button2 },
          "&.Mui-disabled": {
            bgcolor: "gray",
            color: "white",
            opacity: 1,
          },
        }}
      >
        {isCouponApplied ? "Applied" : "Apply Coupon"}
      </Button>
    </Box>
  );
};


export default CouponSection;
