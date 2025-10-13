import React, { useEffect } from "react";
import { motion, easeOut } from "framer-motion";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface OurStoryProps {
  image: string;
  title: string;
  paragraphs: string[];
}

const OurStory: React.FC<OurStoryProps> = ({ image, title, paragraphs }) => {
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  const textVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.5,
        duration: 0.6,
        ease: easeOut,
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 6, md: 10 },
        position: "relative",
      }}
    >
      <Grid container spacing={8} alignItems="center" justifyContent="center">
        {/* --- Left Side (Text Content) --- */}
        <Grid>
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme.Text1,
                fontWeight: 600,
                fontSize: { xs: 28, md: 40 },
                mb: { xs: 3, md: 5 },
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>

            {/* Animated Paragraphs */}
            {paragraphs.map((p, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={paragraphVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Typography
                  sx={{
                    mb: 2,
                    fontSize: 16,
                    lineHeight: 1.9,
                    color: theme.Text1,
                    maxWidth: 480,
                    opacity: 0.9,
                  }}
                >
                  {p}
                </Typography>
              </motion.div>
            ))}
          </motion.div>
        </Grid>

        {/* --- Right Side (Image) --- */}
        <Grid>
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <Box
              component="img"
              src={image}
              alt={title}
              sx={{
                width: "100%",
                maxWidth: "38rem",
                height: "auto",
                borderRadius: 3,
                boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                transition: "all 0.4s ease",
                cursor: "pointer",
              }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OurStory;
