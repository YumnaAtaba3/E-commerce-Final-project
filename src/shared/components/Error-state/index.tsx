import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface ErrorStateProps {
  title?: string; 
  description?: string; 
  onRetry?: () => void;
  height?: string | number;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong.",
  description,
  onRetry,
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
      <Typography variant="h5" sx={{ mb: 2, color: theme.Button2 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: theme.Text2, mb: 2 }}>
          {description}
        </Typography>
      )}
      {onRetry && (
        <Button
          variant="contained"
          onClick={onRetry}
          sx={{
            bgcolor: theme.Button2,
            color: theme.Text1,
            "&:hover": { bgcolor: theme.Button1 },
          }}
        >
          Retry
        </Button>
      )}
    </Box>
  );
};

export default ErrorState;
