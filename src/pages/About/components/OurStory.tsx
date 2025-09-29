import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface OurStoryProps {
  image: string;
  title: string;
  paragraphs: string[];
}

const OurStory: React.FC<OurStoryProps> = ({ image, title, paragraphs }) => {
  const { theme } = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, fontSize: { xs: 28, md: 36 }, mb: 3 }}
          >
            {title}
          </Typography>
          {paragraphs.map((p, i) => (
            <Typography
              key={i}
              maxWidth={500}
              sx={{
                mb: 2,
                fontSize: i === 0 ? 11 : 16,
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
