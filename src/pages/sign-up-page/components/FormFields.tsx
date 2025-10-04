import React from "react";
import { Box, TextField, styled } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { type  SignUpFormValues } from "../config";

interface FormFieldsProps {
  inputFont: string;
  labelFont: string;
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}

const StyledTextField = styled(TextField)({
  "& input": { fontFamily: "'Inter', sans-serif" },
  "& label": { fontFamily: "'Inter', sans-serif" },
});

const FormFields: React.FC<FormFieldsProps> = ({
  inputFont,
  labelFont,
  register,
  errors,
}) => {
  const { theme } = useTheme();
  const fields: {
    name: keyof SignUpFormValues;
    label: string;
    type?: string;
  }[] = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email or Phone Number" },
    { name: "password", label: "Password", type: "password" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {fields.map((field) => (
        <StyledTextField
          key={field.name}
          label={field.label}
          type={field.type || "text"}
          variant="standard"
          fullWidth
          {...register(field.name)}
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message as string}
          sx={{
            "& label": { fontSize: labelFont, color: theme.disabledText },
            "& label.Mui-focused": { color: theme.Button2 },
            "& input": { fontSize: inputFont, color: theme.Text1 },
            "& .MuiInput-underline:before": {
              borderBottomColor: theme.disabledText,
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: theme.Text1,
            },
            "& .MuiInput-underline:after": { borderBottomColor: theme.Button2 },
          }}
        />
      ))}
    </Box>
  );
};

export default FormFields;
