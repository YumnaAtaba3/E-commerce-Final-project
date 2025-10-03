import React from "react";
import { Box, Grid, } from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";
import shoppingImage from "../../assets/Sign-up/shopping-image.jpg";
import SignUpForm from "../../pages/sign-up-page";
import LoginForm from "../../pages/log-in-page";
const AuthLayout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Grid container sx={{ bgcolor: theme.primary1, p:7,pl:0 ,gap:7}}>
      {/* Left side image */}
      <Grid
        item
        xs={20}
        md={10}
        sx={{
          display: "flex",
          bgcolor: theme.primary1,
          
        }}
      >
        <Box
          component="img"
          src={shoppingImage}
          alt="Shopping illustration"
          sx={{
            width: "100%",
            maxWidth: "80rem",
            height: "auto",
            borderRadius: 2,
          }}
        />
      </Grid>

      {/* Right side form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 4, md: 8 },
        }}
      >
        <LoginForm />

      </Grid>
    </Grid>
  );
};

export default AuthLayout;
