import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface LoadingStateProps {
  title?: string; 
  description?: string; 
  height?: string | number;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  title = "Loading...",
  description = "Please wait a moment while we fetch the data.",
  height = "60vh",
}) => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: theme.primary1,
        color: theme.Text1,
        textAlign: "center",
        px: 2,
      }}
    >
      <CircularProgress size={60} sx={{ color: theme.Button2, mb: 3 }} />
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: theme.Text2 }}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingState;
