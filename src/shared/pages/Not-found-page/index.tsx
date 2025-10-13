
import React from "react";
import {
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import { appRoutes } from "../../../routes";

const NotFoundPage: React.FC = () => {
  const { theme } = useTheme();
  const isSmall = useMediaQuery("(max-width:768px)");

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: 0,
        minHeight: "70vh",
        bgcolor: theme.bgColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 3,
        py: { xs: 8, sm: 12, md: 16 },
      }}
    >
      {/* Breadcrumb */}
      <Typography
        variant="body2"
        sx={{
          alignSelf: "flex-start",
          mb: { xs: 2, md: 4 },
          color: theme.Text2,
          marginTop: "-80px",
          fontFamily: theme.font,
        }}
      >
        Home / 404 Error
      </Typography>

      {/* 404 Title */}
      <Typography
        variant={isSmall ? "h5" : "h1"}
        sx={{
          fontSize: isSmall ? 40 : 90,
          fontFamily: `'Roboto', Arial, sans-serif`,

          color: theme.Text1,
        }}
      >
        404 Not Found
      </Typography>

      {/* Subtitle */}
      <Typography
        variant={isSmall ? "h6" : "h5"}
        sx={{
          color: theme.Text1,
          fontFamily: theme.font,
          fontSize: isSmall ? 12 : 20,
        }}
      >
        Your visited page not found. You may go home page.
      </Typography>

      {/* Back Button */}
      <Button
        href={appRoutes.home}
        variant="contained"
        sx={{
          mt: 3,
          bgcolor: theme.Button2,
          fontSize: 12,
          fontWeight: 500,
          textTransform: "none",
          px: 5,
          py: 1.5,

          "&:hover": { bgcolor: theme.HoverButton },
        }}
      >
        Back to home page
      </Button>
    </Container>
  );
};

export default NotFoundPage;
