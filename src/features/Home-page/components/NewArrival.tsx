import React from "react";
import {
  Box,
  Typography,
  Grid,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";

// ✅ Import images
import ps5Img from "../../../assets/Home-page/NewArrival/ps5-slim-goedkope-playstation_large1.png.png";
import womanImg from "../../../assets/Home-page/NewArrival/attractive-woman-wearing-hat-posing-black-background 1.png";
import speakersImg from "../../../assets/Home-page/NewArrival/speakers.png";
import perfumeImg from "../../../assets/Home-page/NewArrival/cucci.png";

import { useTheme } from "../../../theme/ThemeProvider";

const NewArrival: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const CenteredImageBox = ({
    src,
    alt,
    title,
    subtitle,
    height,
    isGlow,
    shopLink,
  }: {
    src: string;
    alt: string;
    title: string;
    subtitle?: string;
    height: number | { xs: number; md: number };
    isGlow?: boolean;
    shopLink?: string;
  }) => (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: height,
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          maxWidth: "90%",
          maxHeight: "90%",
          objectFit: "contain",
          display: "block",
        }}
      />

      {/* Optional Glow */}
      {isGlow && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 150, sm: 200, md: 300 },
            height: { xs: 150, sm: 200, md: 300 },
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(60px)",
            zIndex: 0,
          }}
        />
      )}

      {/* Overlay Text */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: 8, md: 16 },
          bottom: { xs: 16, md: 24 },
          right: { xs: 8, md: "auto" }, // prevent overflow on mobile
          color: "white",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0.5, md: 1 }, // smaller gap on mobile
          maxWidth: { xs: "90%", md: "auto" }, // limit width on mobile
        }}
      >
        {/* Title */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: 16, md: 22 },
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Typography
            sx={{
              maxWidth:300,
              fontWeight: 400,
              fontSize: { xs: 12, md: 16 },
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.2,
              wordBreak: "break-word",
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Shop Now link */}
        {shopLink && (
          <Box
            component="a"
            href={shopLink}
            sx={{
              fontSize: { xs: 12, md: 16 },
              textDecoration: "underline",
              color: "white",
              cursor: "pointer",
              mt: 0.5,
              "&:hover": { color: theme.Button2 },
            }}
          >
            Shop Now
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        mt: 8,
        mb: 8,
        pl: isMobile ? 1 : 8,
        pr: isMobile ? 1 : 8,
        py: 4,
      }}
    >
      {/* Section Header */}
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Box
          sx={{
            width: 20,
            height: 40,
            bgcolor: theme.Button2,
            borderRadius: 1,
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.Button2 }}>
          featured
        </Typography>
      </Box>

      {/* Section Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 4,
          fontSize: { xs: 20, md: 24 },
          color: theme.Text1,
        }}
      >
        New Arrival
      </Typography>

      <Grid container spacing={2}>
        {/* Left: PlayStation */}
        <Grid item xs={12} md={6} ml={isMobile ? 0 : 4} sx={{ minWidth: isMobile?350:600 }}>
          <CenteredImageBox
            src={ps5Img}
            alt="PlayStation 5"
            title="PlayStation 5"
            subtitle="Black and White version of the PS5 coming out on sale."
            height={{ xs: 300, md: 600 }}
            shopLink="/shop/ps5"
          />
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6} sx={{ minWidth:isMobile?350: 600 }}>
          <Grid container spacing={2} direction="column">
            {/* Woman */}
            <Grid item>
              <CenteredImageBox
                src={womanImg}
                alt="Women’s Collections"
                title="Women’s Collections"
                subtitle="Featured woman collections that give you another vibe."
                height={{ xs: 200, md: 300 }}
                shopLink="/shop/women"
              />
            </Grid>

            {/* Speakers + Perfume */}
            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={6} ml={isMobile?2:0} sx={{ minWidth: isMobile ? 150 : 300 }}>
                  <CenteredImageBox
                    src={speakersImg}
                    alt="Speakers"
                    title="Speakers"
                    subtitle="Amazon wireless speakers"
                    height={{ xs: 180, md: 284 }}
                    shopLink="/shop/speakers"
                  />
                </Grid>
                <Grid item xs={6} sx={{ minWidth: isMobile ? 130 : 300 }}>
                  <CenteredImageBox
                    src={perfumeImg}
                    alt="Perfume"
                    title="Perfume"
                    subtitle="GUCCI INTENSE OUD EDP"
                    height={{ xs: 180, md: 284 }}
                    isGlow
                    shopLink="/shop/perfume"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewArrival;
