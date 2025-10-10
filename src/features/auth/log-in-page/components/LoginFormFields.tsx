import React, { useState } from "react";
import {
  Box,
  TextField,
  styled,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTheme } from "../../../../theme/ThemeProvider";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { LoginFormValues } from "../config";
import { motion } from "framer-motion";

import openEye from "../../../../assets/Sign-up/open-eye.png";
import closeEye from "../../../../assets/Sign-up/close-eye.png";

interface LoginFormFieldsProps {
  inputFont: string;
  labelFont: string;
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
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

const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  inputFont,
  labelFont,
  register,
  errors,
}) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  // Framer motion variants
  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <FieldsContainer>
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fieldVariants}
      >
        <TextField
          autoComplete="username"
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
              "&.Mui-focused": { color: theme.Text1 },
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
            "& .MuiFormHelperText-root": {
              color: theme.Button2,
              fontSize: 10,
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: theme.disabledText,
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: theme.Text1,
            },
            "& .MuiInput-underline:after": { borderBottomColor: theme.Text1 },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 1000px ${theme.primary1} inset`,
              WebkitTextFillColor: theme.Text1,
              transition: "background-color 5000s ease-in-out 0s",
            },
          }}
        />
      </motion.div>

      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fieldVariants}
      >
        <TextField
          autoComplete="new-password"
          label="Password"
          variant="standard"
          fullWidth
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
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
          }}
          sx={{
            "& .MuiFormHelperText-root": {
              color: theme.Button2,
              fontSize: 10,
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: theme.disabledText,
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: theme.Text1,
            },
            "& .MuiInput-underline:after": { borderBottomColor: theme.Text1 },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 1000px ${theme.primary1} inset`,
              WebkitTextFillColor: theme.Text1,
              transition: "background-color 5000s ease-in-out 0s",
            },
          }}
        />
      </motion.div>
    </FieldsContainer>
  );
};

export default LoginFormFields;
