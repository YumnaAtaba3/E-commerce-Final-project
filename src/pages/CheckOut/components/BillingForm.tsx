import { Box, Typography, OutlinedInput, Checkbox } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import { useState } from "react";

interface Field {
  label: string;
  required?: boolean;
}

const BillingForm = () => {
  const { theme } = useTheme();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const fields: Field[] = [
    { label: "First Name", required: true },
    { label: "Company Name" },
    { label: "Street Address", required: true },
    { label: "Apartment, floor, etc. (optional)" },
    { label: "Town/City", required: true },
    { label: "Phone Number", required: true },
    { label: "Email Address", required: true },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxHeight: { xs: "auto", md: 830 },
        overflowY: { xs: "visible", md: "auto" },
        p: { xs: 1, md: 2 },
        transition: "all 0.3s ease-in-out",
      }}
    >
      {fields.map((field, i) => (
        <Box key={i} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Label with red * if required */}
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              color: focusedIndex === i ? theme.Button2 : theme.Text1,
              transition: "color 0.2s",
            }}
          >
            {field.label}
            {field.required && (
              <Box component="span" sx={{ color: "red", ml: 0.3 }}>
                *
              </Box>
            )}
          </Typography>

          {/* Input */}
          <OutlinedInput
          fullWidth
            size="small"
            required={field.required}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(null)}
            sx={{
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              px: 1.2,
              py: 0.8,
              bgcolor: theme.bgColor,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid transparent", // no border default
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: `1px solid ${theme.Button2}`, // border on focus
              },
            }}
          />
        </Box>
      ))}

      {/* Save info checkbox */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Checkbox
          id="saveInfo"
          sx={{
            color: theme.Button2,
            "&.Mui-checked": { color: theme.Button2 },
            transform: "scale(1.3)",
          }}
        />
        <Typography
          htmlFor="saveInfo"
          component="label"
          sx={{
            fontSize: "14px",
            cursor: "pointer",
            color: theme.Text1,
          }}
        >
          Save this information for faster check-out next time
        </Typography>
      </Box>
    </Box>
  );
};

export default BillingForm;
