import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Link,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import qrCode from "../../assets/Footer/Qr Code.svg";
import iconSend from "../../assets/Footer/icon-send.svg";
import googlePlay from "../../assets/Footer/google-play-store-logo.svg";
import appStore from "../../assets/Footer/AppStore.svg";
import { useTheme } from "../../theme/ThemeProvider";

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const maxContentWidth = "1200px";

  return (
    <>
      {/* Main Footer */}
      <Box
        sx={{
          bgcolor: theme.ButtonCard,
          color: theme.secound1,
          pt: 8,
          pb: 6,
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            maxWidth: maxContentWidth,
            mx: "auto",
            px: { xs: 2, md: 6 },
          }}
        >
          <Grid
            container
            spacing={ isMobile?5:13}
            justifyContent={isMobile ? "center" : "flex-start"}
          >
            {/* Exclusive */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                Exclusive
              </Typography>
              <Typography sx={{ mt: 3, fontSize: 14, fontWeight: 500 }}>
                Subscribe
              </Typography>
              <Typography sx={{ mt: 2, fontSize: 14 }}>
                Get 10% off your first order
              </Typography>
              <TextField
                placeholder="Enter your email"
                size="small"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" sx={{ color: theme.primary1 }}>
                        <Box
                          component="img"
                          src={iconSend}
                          alt="send"
                          sx={{ width: 20, height: 20 }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mt: 2,
                  width: "100%",
                  bgcolor: theme.ButtonCard,
                  input: { color: theme.secound1, fontSize: 14, p: 1.2 },
                  "& fieldset": { borderColor: theme.borderColor },
                  "&:hover fieldset": { borderColor: theme.borderColor },
                }}
              />
            </Grid>

            {/* Support */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                Support
              </Typography>
              {[
                "111 Bijoy sarani, Dhaka,",
                "DH 1515, Bangladesh.",
                "exclusive@gmail.com",
                "+88015-88888-9999",
              ].map((txt, i) => (
                <Typography key={i} sx={{ mt: i === 0 ? 3 : 2, fontSize: 14 }}>
                  {txt}
                </Typography>
              ))}
            </Grid>

            {/* Account */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                Account
              </Typography>
              <Box
                sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
              >
                {[
                  "My Account",
                  "Login / Register",
                  "Cart",
                  "Wishlist",
                  "Shop",
                ].map((txt) => (
                  <Link
                    key={txt}
                    href="#"
                    underline="hover"
                    sx={{ color: theme.secound1, fontSize: 14 }}
                  >
                    {txt}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Quick Link */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                Quick Link
              </Typography>
              <Box
                sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
              >
                {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map(
                  (txt) => (
                    <Link
                      key={txt}
                      href="#"
                      underline="hover"
                      sx={{ color: theme.secound1, fontSize: 14 }}
                    >
                      {txt}
                    </Link>
                  )
                )}
              </Box>
            </Grid>

            {/* Download App */}
            <Grid
              item
              xs={12}
              sm={12} // take full width on small screens
              md={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: isMobile ? "flex-start" : "flex-start",
              }}
            >
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                Download App
              </Typography>
              <Typography sx={{ mt: 3, fontSize: 14 }}>
                Save $3 with App New User Only
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  flexWrap: isMobile ? "wrap" : "nowrap",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <Box
                  component="img"
                  src={qrCode}
                  alt="QR"
                  sx={{ width: 80, height: 80 }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box
                    component="img"
                    src={googlePlay}
                    alt="Google Play"
                    sx={{ width: 120 }}
                  />
                  <Box
                    component="img"
                    src={appStore}
                    alt="App Store"
                    sx={{ width: 120 }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 4,
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map(
                  (Icon, i) => (
                    <IconButton
                      size="large"
                      key={i}
                      sx={{
                        color: theme.secound1,
                        p: 1,
                        "&:hover": { color: theme.HoverButton },
                      }}
                    >
                      <Icon />
                    </IconButton>
                  )
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Bottom Bar */}
      <Box
        sx={{
          bgcolor: theme.ButtonCard,
          borderTop: "0.5px solid rgba(255,255,255,0.2)",
          py: 2,
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            maxWidth: maxContentWidth,
            mx: "auto",
            px: { xs: 2, md: 6 },
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
            © Copyright Rimel 2022. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
