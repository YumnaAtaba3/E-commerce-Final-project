/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Typography,
  OutlinedInput,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import { useState, forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { billingFormSchemaValidation, type BillingFormValues } from "../config";


export interface BillingFormRef {
  submitForm: () => Promise<BillingFormValues | null>;
}

const BillingForm = forwardRef<BillingFormRef>((_, ref) => {
  const { theme } = useTheme();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const {
    control,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<BillingFormValues>({
    resolver: yupResolver(billingFormSchemaValidation) as any,
    defaultValues: {
      firstName: "",
      companyName: "",
      streetAddress: "",
      apartment: "",
      townCity: "",
      phoneNumber: "",
      emailAddress: "",
      saveInfo: false,
    },
  });

 
  useImperativeHandle(ref, () => ({
    async submitForm() {
      const isValid = await trigger();
      if (!isValid) return null;
      return getValues();
    },
  }));

  const fields = [
    { name: "firstName", label: "First Name", required: true },
    { name: "companyName", label: "Company Name" },
    { name: "streetAddress", label: "Street Address", required: true },
    { name: "apartment", label: "Apartment, floor, etc. (optional)" },
    { name: "townCity", label: "Town/City", required: true },
    { name: "phoneNumber", label: "Phone Number", required: true },
    { name: "emailAddress", label: "Email Address", required: true },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        p: { xs: 1, md: 2 },
      }}
    >
      {fields.map((field, i) => (
        <Controller
          key={field.name}
          name={field.name as keyof BillingFormValues}
          control={control}
          render={({ field: controllerField }) => (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                  color: focusedIndex === i ? theme.Button2 : theme.Text1,
                }}
              >
                {field.label}
                {field.required && (
                  <Box component="span" sx={{ color: "red", ml: 0.3 }}>
                    *
                  </Box>
                )}
              </Typography>

              <OutlinedInput
                {...controllerField}
                fullWidth
                size="small"
                onFocus={() => setFocusedIndex(i)}
                onBlur={() => setFocusedIndex(null)}
                error={Boolean(errors[field.name as keyof BillingFormValues])}
                sx={{
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                  bgcolor: theme.bgColor,
                  color: theme.Text1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid transparent",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: `1px solid ${theme.Button2}`,
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 1000px ${theme.primary1} inset`,
                    WebkitTextFillColor: theme.Text1,
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                }}
              />

              {errors[field.name as keyof BillingFormValues] && (
                <FormHelperText error sx={{ mt: -1 }}>
                  {
                    errors[field.name as keyof BillingFormValues]
                      ?.message as string
                  }
                </FormHelperText>
              )}
            </Box>
          )}
        />
      ))}

      {/* Save info checkbox */}
      <Controller
        name="saveInfo"
        control={control}
        render={({ field }) => (
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Checkbox
              {...field}
              checked={field.value}
              sx={{
                color: theme.Button2,
                "&.Mui-checked": { color: theme.Button2 },
                transform: "scale(1.3)",
              }}
            />
            <Typography
              sx={{ fontSize: "14px", cursor: "pointer", color: theme.Text1 }}
            >
              Save this information for faster check-out next time
            </Typography>
          </Box>
        )}
      />
    </Box>
  );
});

export default BillingForm;
