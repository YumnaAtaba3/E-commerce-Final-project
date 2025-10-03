import React from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "../../theme/ThemeProvider";

interface ArrowNavigationProps {
  prevClass: string; // class name for swiper prev
  nextClass: string; // class name for swiper next
  isMobile?: boolean; // for responsive padding
}

const ArrowNavigation: React.FC<ArrowNavigationProps> = ({
  prevClass,
  nextClass,
  isMobile = false,
}) => {
  const { theme } = useTheme();

  return (
    <Box display="flex" gap={1} pr={isMobile ? 0 : 7}>
      <IconButton
        className={prevClass}
        sx={{
          border: "none",
          color: "black",
          borderRadius: "50%",
          width: 40,
          height: 40,
          bgcolor: "#f5f5f5",
          "&:hover": {
            bgcolor: theme.Button2,
            color: "white",
            borderColor: theme.Button2,
          },
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <IconButton
        className={nextClass}
        sx={{
          border: "none",
          color: "black",
          borderRadius: "50%",
          width: 40,
          height: 40,
          bgcolor: "#f5f5f5",
          "&:hover": {
            bgcolor: theme.Button2,
            color: "white",
            borderColor: theme.Button2,
          },
        }}
      >
        <ArrowForwardIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default ArrowNavigation;
