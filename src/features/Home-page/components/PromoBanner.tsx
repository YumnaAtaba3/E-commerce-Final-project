import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import SpeakerImg from "../../../assets/Home-page/speaker.svg";
import { motion } from "framer-motion";

const PromoBanner: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds -= 1;
        else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderCircle = (
    value: number,
    label: string,
    shortLabel: string,
    idx: number
  ) => (
    <motion.div
      key={label}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
      style={{ willChange: "transform, opacity" }}
    >
      <Box
        sx={{
          bgcolor: "white",
          color: "black",
          borderRadius: "50%",
          width: { xs: 55, sm: 60, md: 68 },
          height: { xs: 55, sm: 60, md: 68 },
          mb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          mx: 0.6,
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 14 } }}
        >
          {value.toString().padStart(2, "0")}
        </Typography>
        <Typography variant="caption" sx={{ fontSize: { xs: 10, sm: 12 } }}>
          {isMobile ? shortLabel : label}
        </Typography>
      </Box>
    </motion.div>
  );

  const MotionButton = motion(Button);

  return (
    <Box
      sx={{
        bgcolor: "black",
        borderRadius: 2,
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        mt: 8,
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          alignItems="center"
          spacing={{ xs: 4, md: 4, lg: 4, xl: 20 }}
        >
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.Button1,
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: 14, md: 18 },
                  letterSpacing: 3,
                  textTransform: "none",
                }}
              >
                Categories
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "white",
                  fontSize: { xs: 26, sm: 32, md: 40 },
                  letterSpacing: 4,
                }}
              >
                Enhance Your
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "white",
                  fontSize: { xs: 26, sm: 32, md: 40 },
                  letterSpacing: 4,
                }}
              >
                Music Experience
              </Typography>

              <Box sx={{ display: "flex", mb: 3, flexWrap: "wrap" }}>
                {renderCircle(timeLeft.days, "Days", "D", 0)}
                {renderCircle(timeLeft.hours, "Hours", "H", 1)}
                {renderCircle(timeLeft.minutes, "Minutes", "M", 2)}
                {renderCircle(timeLeft.seconds, "Seconds", "S", 3)}
              </Box>

              {/* Animated Buy Now Button */}
              <Box textAlign="left">
                <MotionButton
                  variant="contained"
                  sx={{
                    bgcolor: theme.Button1,
                    px: { xs: 3, md: 5 },
                    py: { xs: 1, md: 1.5 },
                    borderRadius: 1,
                    fontSize: { xs: 14, md: 16 },
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#00B248" },
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Buy Now
                </MotionButton>
              </Box>
            </motion.div>
          </Grid>

          {/* Right Image */}
          <Grid item xs={12} md={6} textAlign="center">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
            >
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: 250, sm: 400, md: 700 },
                    height: { xs: 250, sm: 400, md: 700 },
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(0,0,0,0) 70%)",
                    filter: "blur(60px)",
                    zIndex: 0,
                  }}
                />
                <Box
                  component="img"
                  src={SpeakerImg}
                  alt="Speaker"
                  sx={{
                    width: "100%",
                    maxWidth: { xs: 280, sm: 350, md: 600 },
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PromoBanner;
