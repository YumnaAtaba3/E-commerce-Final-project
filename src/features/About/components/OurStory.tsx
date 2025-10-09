import React, { useEffect } from "react";
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
    window.scrollTo({ top: -4, behavior: "smooth" });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{
              color:theme.Text1,
              fontWeight: 700,
              fontSize: { xs: 28, md: 36 },
              mb: { xs: 3, md: 6 },
            }}
          >
            {title}
          </Typography>
          {paragraphs.map((p, i) => (
            <Typography
              key={i}
              maxWidth={500}
              sx={{
                mb: 2,
                fontSize: 16,
                lineHeight: 1.8,
                color: theme.Text1,
              }}
            >
              {p}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: "100%",
              maxWidth: "60rem",
              height: "auto",
              borderRadius: 2,
              boxShadow: "0px 10px 30px rgba(0,0,0,0.35)",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OurStory;
