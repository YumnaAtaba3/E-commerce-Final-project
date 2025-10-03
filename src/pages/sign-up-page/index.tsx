import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";
import { Link as RouterLink } from "react-router";

import GoogleSvg from "../../assets/Sign-up/Icon-Google.svg";
import { appRoutes } from "../../routes";

const SignUpForm: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  // Responsive font sizes
  const headingFont = isMobile ? "24px" : "32px";
  const subHeadingFont = isMobile ? "14px" : "16px";
  const inputFont = isMobile ? "14px" : "16px";
  const labelFont = isMobile ? "12px" : "14px";
  const buttonFont = isMobile ? "14px" : "16px";
  const linkFont = isMobile ? "12px" : "14px";

  return (
    <Box
      sx={{
        maxWidth: 370,
        width: "100%",
        mx: isMobile ? 5 : 0, // center horizontally on mobile
      }}
    >
      {/* Heading */}
      <Typography
        sx={{
          fontSize: headingFont,
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
          fontSize: subHeadingFont,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          color: theme.Text1,
        }}
      >
        Enter your details below
      </Typography>

      {/* Form Fields */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {["Name", "Email or Phone Number", "Password"].map((label) => (
          <TextField
            key={label}
            label={label}
            type={label === "Password" ? "password" : "text"}
            variant="standard"
            fullWidth
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
        ))}

        {/* Create Account Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 1,
            bgcolor: theme.Button2,
            fontSize: buttonFont,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            textTransform: "none",
            py: 1.2,
            "&:hover": { bgcolor: theme.error },
          }}
        >
          Create Account
        </Button>

        {/* Google Sign Up Button */}
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
            fontSize: buttonFont,
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
            fontSize: linkFont,
            fontFamily: "'Inter', sans-serif",
            color: theme.secondaryText,
          }}
        >
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to={appRoutes.auth.login}
            underline="hover"
            sx={{
              color: theme.primaryText,
              fontSize: linkFont,
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
