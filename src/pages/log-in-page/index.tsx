import React from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";

const LoginForm: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box sx={{ maxWidth: 370, width: "100%" }}>
      {/* Heading */}
      <Typography
        sx={{
          fontSize: "32px",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          color: theme.Text1,
        }}
        gutterBottom
      >
        Log in to Exclusive
      </Typography>

      <Typography
        sx={{
          mb: 4,
          fontSize: "16px",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          color: theme.Text1,
        }}
      >
        Enter your details below
      </Typography>

      {/* Form Fields */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Email or Phone Number"
          variant="standard"
          fullWidth
          InputLabelProps={{
            sx: {
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              color: theme.disabledText,
              "&.Mui-focused": {
                color: theme.Button2, // label on focus
              },
            },
          }}
          inputProps={{
            style: {
              fontSize: "16px",
              fontFamily: "'Inter', sans-serif",
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
              borderBottomColor: theme.Button2, // border on focus
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          InputLabelProps={{
            sx: {
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              color: theme.disabledText,
              "&.Mui-focused": {
                color: theme.Button2,
              },
            },
          }}
          inputProps={{
            style: {
              fontSize: "16px",
              fontFamily: "'Inter', sans-serif",
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
      </Box>

      {/* Login Button + Forgot Password */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: theme.Button2,
            px: 4,
            py: 1.2,
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
            textTransform: "none",
            "&:hover": {
              bgcolor: theme.Button2, 
            },
          }}
        >
          Log In
        </Button>

        <Link
          href="#"
          underline="none"
          sx={{
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
            color: theme.Button2,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Forgot Password?
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
