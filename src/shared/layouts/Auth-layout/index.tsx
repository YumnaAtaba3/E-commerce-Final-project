import React from "react";
import {
  Box,
  Grid,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import shoppingImage from "../../../assets/Sign-up/shopping-image.jpg";
import { Outlet } from "react-router";

const AuthLayout: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm")); 

  return (
    <Grid
      container
      sx={{
        bgcolor: theme.primary1,
        p: { xs: 2, md: 7 },
        gap: { xs: 2, md: 7 },
      }}
    >
      {/* Left side image (hidden on mobile) */}
      {!isMobile && (
        <Grid
         
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={shoppingImage}
            alt="Shopping illustration"
            sx={{
              ml:0,
              pl:0,
              width: "100%",
              maxWidth: "50rem",
              height: "auto",
              borderRadius: 2,
              objectFit: "cover",
            }}
          />
        </Grid>
      )}

      {/* Right side form */}
      <Grid
       
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, md: 8 },
        }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
