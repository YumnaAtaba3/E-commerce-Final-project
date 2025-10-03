import React from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";
import { Link as RouterLink } from "react-router";


import GoogleSvg from "../../assets/Sign-up/Icon-Google.svg";
import { appRoutes } from "../../routes";

const SignUpForm: React.FC = () => {
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
        Create an account
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
          label="Name"
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

        {/* Create Account Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            bgcolor: theme.Button2,
            fontSize: "16px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            textTransform: "none",
            py: 1.2,
            "&:hover": { bgcolor: theme.error },
          }}
        >
          Create Account
        </Button>

        {/* Google Sign Up Button with custom SVG */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={
            <Box
              component="img"
              src={GoogleSvg}
              alt="Google"
              sx={{ width: 20, height: 20 }}
            />
          }
          sx={{
            textTransform: "none",
            color: theme.secondaryText,
            borderColor: theme.borderColor,
            fontSize: "16px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            py: 1.2,
            "&:hover": { borderColor: theme.primaryText },
          }}
        >
          Sign up with Google
        </Button>

        {/* Already have account */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 1,
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
            color: theme.secondaryText,
          }}
        >
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to={appRoutes.auth.login} // this points to your login route
            underline="hover"
            sx={{
              color: theme.primaryText,
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              ml: 1,
            }}
          >
            Log in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
