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
import { motion } from "framer-motion";

const AuthLayout: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

  const hideImage = isMobile || isTablet;

  return (
    <Grid
      container
      sx={{
        bgcolor: theme.primary1,
        p: { xs: 2, md: 0 },
        pt: { xs: 2, md: 5 },
        pb: { xs: 2, md: 20 },
        pr: { xs: 2, md: 10 },
        gap: hideImage ? 0 : 3,
      }}
      justifyContent={hideImage ? "center" : "flex-start"}
      alignItems="center"
    >
      {/* Left side image (hidden on tablet and mobile) */}
      {!hideImage && (
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Box
            component={motion.img}
            src={shoppingImage}
            alt="Shopping illustration"
            initial={{ opacity: 0, x: -200 }} // Start off-screen left
            animate={{ opacity: 1, x: 0 }} // Animate to final position
            transition={{ duration: 0.8, ease: "easeOut" }}
            sx={{
              pl: 0,
              ml: 0,
              width: "95%",
              maxWidth: "500rem",
              height: "auto",
              borderRadius: 0,
              objectFit: "cover",
            }}
          />
        </Grid>
      )}

      {/* Right side form */}
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: hideImage ? 1 : undefined,
          p: { xs: 2, md: 13 },
          Pl: { xs: 2, md: 0 },
          pr: { xs: 10, md: 0 },
          mr: { xs: 0, md: 10 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: "100%" }}
        >
          <Outlet />
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
