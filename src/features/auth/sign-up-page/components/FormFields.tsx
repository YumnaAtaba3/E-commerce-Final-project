import React, { useState } from "react";
import {
  Box,
  TextField,
  styled,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTheme } from "../../../../theme/ThemeProvider";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { SignUpFormValues } from "../config";

import openEye from "../../../../assets/Sign-up/open-eye.png";
import closeEye from "../../../../assets/Sign-up/close-eye.png";

interface FormFieldsProps {
  inputFont: string;
  labelFont: string;
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}

const FieldsContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 24,
}));

const EyeButton = styled(IconButton)(() => ({
  padding: 0,
  transition: "all 0.3s ease",
  "& img": {
    width: 26,
    height: 20,
    transition: "transform 0.3s ease",
  },
  "&:hover img": {
    transform: "scale(1.1)",
  },
}));

const FormFields: React.FC<FormFieldsProps> = ({
  inputFont,
  labelFont,
  register,
  errors,
}) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

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
    <FieldsContainer>
      {fields.map((field) => {
        const isPassword = field.name === "password";

        return (
          <TextField
            autoComplete="new-password"
            key={field.name}
            label={field.label}
            type={isPassword && showPassword ? "text" : field.type || "text"}
            variant="standard"
            fullWidth
            {...register(field.name)}
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message as string}
            InputProps={{
              endAdornment: isPassword && (
                <InputAdornment position="end">
                  <EyeButton onClick={() => setShowPassword((prev) => !prev)}>
                    <img
                      src={showPassword ? openEye : closeEye}
                      alt="toggle visibility"
                    />
                  </EyeButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              sx: {
                fontSize: labelFont,
                fontFamily: "'Inter', sans-serif",
                color: theme.disabledText,
                "&.Mui-focused": { color: theme.Text1 },
              },
            }}
            inputProps={{
              style: {
                fontSize: inputFont,
                fontFamily: "'Inter', sans-serif",
                color: theme.Text1,
              },
              autoComplete: "new-password",
            }}
            sx={{
              "& .MuiFormHelperText-root": {
                color: theme.Button2, 
                fontSize:10
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: theme.disabledText,
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: theme.Text1,
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: theme.Text1,
              },
            }}
          />
        );
      })}
    </FieldsContainer>
  );
};

export default FormFields;
