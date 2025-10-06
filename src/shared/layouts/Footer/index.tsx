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

import qrCode from "../../../assets/Footer/Qr Code.svg";
import iconSend from "../../../assets/Footer/icon-send.svg";
import googlePlay from "../../../assets/Footer/google-play-store-logo.svg";
import appStore from "../../../assets/Footer/AppStore.svg";
import { useTheme } from "../../../theme/ThemeProvider";

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        bgcolor: theme.ButtonCard,
        color: theme.secound1,
        pt: 8,
        pb: 6,
        width: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Content container */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 6 },
          width: "100%",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <Grid container spacing={isMobile ? 4 : 10}>
          {/* Exclusive */}
          <Grid>
            <Typography sx={{ fontSize: isMobile ? 16 : 18, fontWeight: 600 }}>
              Exclusive
            </Typography>
            <Typography
              sx={{ mt: 3, fontSize: isMobile ? 12 : 14, fontWeight: 500 }}
            >
              Subscribe
            </Typography>
            <Typography sx={{ mt: 2, fontSize: isMobile ? 12 : 14 }}>
              Get 10% off your first order
            </Typography>
            <TextField
              placeholder="Enter your email"
              size="small"
              variant="outlined"
              fullWidth
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
                input: {
                  color: theme.secound1,
                  fontSize: isMobile ? 12 : 14,
                  p: 1.2,
                },
                "& fieldset": { borderColor: theme.borderColor },
              }}
            />
          </Grid>

          {/* Support */}
          <Grid>
            <Typography sx={{ fontSize: isMobile ? 16 : 18, fontWeight: 600 }}>
              Support
            </Typography>
            {[
              "111 Bijoy sarani, Dhaka,",
              "DH 1515, Bangladesh.",
              "exclusive@gmail.com",
              "+88015-88888-9999",
            ].map((txt, i) => (
              <Typography
                key={i}
                sx={{ mt: i === 0 ? 3 : 2, fontSize: isMobile ? 12 : 14 }}
              >
                {txt}
              </Typography>
            ))}
          </Grid>

          {/* Account */}
          <Grid>
            <Typography sx={{ fontSize: isMobile ? 16 : 18, fontWeight: 600 }}>
              Account
            </Typography>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 1.5 : 2,
              }}
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
                  sx={{ color: theme.secound1, fontSize: isMobile ? 12 : 14 }}
                >
                  {txt}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Quick Link */}
          <Grid>
            <Typography sx={{ fontSize: isMobile ? 16 : 18, fontWeight: 600 }}>
              Quick Link
            </Typography>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 1.5 : 2,
              }}
            >
              {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map(
                (txt) => (
                  <Link
                    key={txt}
                    href="#"
                    underline="hover"
                    sx={{ color: theme.secound1, fontSize: isMobile ? 12 : 14 }}
                  >
                    {txt}
                  </Link>
                )
              )}
            </Box>
          </Grid>

          {/* Download App */}
          <Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMobile ? "center" : "flex-start",
                width: "100%",
              }}
            >
              <Typography
                sx={{ fontSize: isMobile ? 16 : 18, fontWeight: 600 }}
              >
                Download App
              </Typography>
              <Typography sx={{ mt: 3, fontSize: isMobile ? 12 : 14 }}>
                Save $3 with App New User Only
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  gap: 2,
                  flexWrap: isMobile ? "wrap" : "nowrap",
                  justifyContent: isMobile ? "center" : "flex-start",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  component="img"
                  src={qrCode}
                  alt="QR"
                  sx={{ width: 80, height: 80, flexShrink: 0 }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box
                    component="img"
                    src={googlePlay}
                    alt="Google Play"
                    sx={{ width: 120, maxWidth: "100%" }}
                  />
                  <Box
                    component="img"
                    src={appStore}
                    alt="App Store"
                    sx={{ width: 120, maxWidth: "100%" }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 4,
                  justifyContent: isMobile ? "center" : "flex-start",
                  flexWrap: "wrap", // ✅ prevents overflow
                  width: "100%",
                }}
              >
                {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map(
                  (Icon, i) => (
                    <IconButton
                      key={i}
                      size="large"
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
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: "0.5px solid rgba(255,255,255,0.2)",
            py: 3,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: isMobile ? 12 : 14,
            }}
          >
            © Copyright Rimel 2022. All rights reserved.
          </Typography>
        </Box>
      </Box>
     
    </Box>
  );
};

export default Footer;
// import React from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   TextField,
//   Link,
//   InputAdornment,
//   IconButton,
//   useMediaQuery,
//   useTheme as useMuiTheme,
// } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";

// import qrCode from "../../../assets/Footer/Qr Code.svg";
// import iconSend from "../../../assets/Footer/icon-send.svg";
// import googlePlay from "../../../assets/Footer/google-play-store-logo.svg";
// import appStore from "../../../assets/Footer/AppStore.svg";
// import { useTheme } from "../../../theme/ThemeProvider";

// const Footer: React.FC = () => {
//   const { theme } = useTheme();
//   const muiTheme = useMuiTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
//   const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

//   return (
//     <Box
//       component="footer"
//       sx={{
//         bgcolor: theme.ButtonCard,
//         color: theme.secound1,
//         pt: 8,
//         pb: 6,
//         width: "100%",
//         overflowX: "hidden",
//         boxSizing: "border-box",
//       }}
//     >
//       {/* Container */}
//       <Box
//         sx={{
//           maxWidth: 1170,
//           mx: "auto",
//           px: { xs: 2, sm: 3, md: 0 },
//           width: "100%",
//         }}
//       >
//         <Grid container spacing={isMobile ? 4 : 10}>
//           {/* Exclusive */}
//           <Grid item xs={12} sm={6} md={3}>
//             <Typography
//               sx={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, mb: 3 }}
//             >
//               Exclusive
//             </Typography>
//             <Typography
//               sx={{ fontSize: isMobile ? 12 : 14, fontWeight: 500, mt: 1 }}
//             >
//               Subscribe
//             </Typography>
//             <Typography sx={{ fontSize: isMobile ? 12 : 14, mt: 1 }}>
//               Get 10% off your first order
//             </Typography>
//             <TextField
//               placeholder="Enter your email"
//               size="small"
//               variant="outlined"
//               fullWidth
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton edge="end" sx={{ color: theme.primary1 }}>
//                       <Box
//                         component="img"
//                         src={iconSend}
//                         alt="send"
//                         sx={{ width: 20, height: 20 }}
//                       />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 mt: 2,
//                 bgcolor: theme.ButtonCard,
//                 input: {
//                   color: theme.secound1,
//                   fontSize: isMobile ? 12 : 14,
//                   p: 1.2,
//                 },
//                 "& fieldset": { borderColor: theme.borderColor },
//               }}
//             />
//           </Grid>

//           {/* Support */}
//           <Grid item xs={12} sm={6} md={3}>
//             <Typography
//               sx={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, mb: 3 }}
//             >
//               Support
//             </Typography>
//             {[
//               "111 Bijoy sarani, Dhaka,",
//               "DH 1515, Bangladesh.",
//               "exclusive@gmail.com",
//               "+88015-88888-9999",
//             ].map((txt, i) => (
//               <Typography
//                 key={i}
//                 sx={{ fontSize: isMobile ? 12 : 14, mt: i === 0 ? 0 : 1 }}
//               >
//                 {txt}
//               </Typography>
//             ))}
//           </Grid>

//           {/* Account */}
//           <Grid item xs={12} sm={6} md={3}>
//             <Typography
//               sx={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, mb: 3 }}
//             >
//               Account
//             </Typography>
//             {["My Account", "Login / Register", "Cart", "Wishlist", "Shop"].map(
//               (txt) => (
//                 <Link
//                   key={txt}
//                   href="#"
//                   underline="hover"
//                   sx={{
//                     display: "block",
//                     color: theme.secound1,
//                     fontSize: isMobile ? 12 : 14,
//                     mb: 1,
//                   }}
//                 >
//                   {txt}
//                 </Link>
//               )
//             )}
//           </Grid>

//           {/* Quick Link */}
//           <Grid item xs={12} sm={6} md={3}>
//             <Typography
//               sx={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, mb: 3 }}
//             >
//               Quick Link
//             </Typography>
//             {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map((txt) => (
//               <Link
//                 key={txt}
//                 href="#"
//                 underline="hover"
//                 sx={{
//                   display: "block",
//                   color: theme.secound1,
//                   fontSize: isMobile ? 12 : 14,
//                   mb: 1,
//                 }}
//               >
//                 {txt}
//               </Link>
//             ))}
//           </Grid>

//           {/* Download App & Social */}
//           <Grid item xs={12} sm={12} md={12}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 mt: 6,
//               }}
//             >
//               <Typography
//                 sx={{ fontSize: isMobile ? 16 : 18, fontWeight: 600 }}
//               >
//                 Download App
//               </Typography>
//               <Typography sx={{ fontSize: isMobile ? 12 : 14, mt: 1 }}>
//                 Save $3 with App New User Only
//               </Typography>
//               <Box
//                 sx={{
//                   display: "flex",
//                   gap: 2,
//                   mt: 2,
//                   flexWrap: "wrap",
//                   justifyContent: "center",
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src={qrCode}
//                   alt="QR"
//                   sx={{ width: 80, height: 80 }}
//                 />
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                   <Box
//                     component="img"
//                     src={googlePlay}
//                     alt="Google Play"
//                     sx={{ width: 120, maxWidth: "100%" }}
//                   />
//                   <Box
//                     component="img"
//                     src={appStore}
//                     alt="App Store"
//                     sx={{ width: 120, maxWidth: "100%" }}
//                   />
//                 </Box>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   gap: 2,
//                   mt: 4,
//                   justifyContent: "center",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map(
//                   (Icon, i) => (
//                     <IconButton
//                       key={i}
//                       sx={{
//                         bgcolor: "rgba(255,255,255,0.2)",
//                         color: "#fff",
//                         width: 40,
//                         height: 40,
//                         "&:hover": { bgcolor: "#fff", color: theme.ButtonCard },
//                       }}
//                     >
//                       <Icon />
//                     </IconButton>
//                   )
//                 )}
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Bottom Bar */}
//         <Box
//           sx={{
//             borderTop: "0.5px solid rgba(255,255,255,0.2)",
//             py: 3,
//             mt: 6,
//             textAlign: "center",
//           }}
//         >
//           <Typography
//             sx={{
//               color: "rgba(255,255,255,0.7)",
//               fontSize: isMobile ? 12 : 14,
//             }}
//           >
//             © Copyright Rimel 2022. All rights reserved.
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Footer;
