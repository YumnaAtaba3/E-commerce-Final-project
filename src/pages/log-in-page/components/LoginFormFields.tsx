import React from "react";
import { Box, TextField, styled } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { LoginFormValues } from "../config";

interface LoginFormFieldsProps {
  inputFont: string;
  labelFont: string;
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
}

// Styled container
const FieldsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  inputFont,
  labelFont,
  register,
  errors,
}) => {
  const { theme } = useTheme();

  return (
    <FieldsContainer>
      <TextField
        label="Email or Phone Number"
        variant="standard"
        fullWidth
        type="text"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        InputLabelProps={{
          sx: {
            fontSize: labelFont,
            fontFamily: "'Inter', sans-serif",
            color: theme.disabledText,
            "&.Mui-focused": {
              color: theme.Button2,
            },
          },
        }}
        inputProps={{
          style: {
            fontSize: inputFont,
            fontFamily: "'Inter', sans-serif",
            color: theme.Text1,
          },
        }}
        sx={{
          "& .MuiInput-underline:before": {
            borderBottomColor: theme.disabledText,
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: theme.Text1,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: theme.Button2,
          },
        }}
      />

      <TextField
        label="Password"
        variant="standard"
        fullWidth
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputLabelProps={{
          sx: {
            fontSize: labelFont,
            fontFamily: "'Inter', sans-serif",
            color: theme.disabledText,
            "&.Mui-focused": {
              color: theme.Button2,
            },
          },
        }}
        inputProps={{
          style: {
            fontSize: inputFont,
            fontFamily: "'Inter', sans-serif",
            color: theme.Text1,
          },
        }}
        sx={{
          "& .MuiInput-underline:before": {
            borderBottomColor: theme.disabledText,
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: theme.Text1,
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: theme.Button2,
          },
        }}
      />
    </FieldsContainer>
  );
};

export default LoginFormFields;
