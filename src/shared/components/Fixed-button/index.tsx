import React, { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import NorthIcon from "@mui/icons-material/North"; 
import { useTheme } from "../../../theme/ThemeProvider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme as useMuiTheme } from "@mui/material/styles";

const FixedButton: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setShowButton(true);
      else setShowButton(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Zoom in={showButton}>
      <Fab
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: isMobile ? 70 : 100, 
          right: isMobile ? 16 : 60,
          width: isMobile ? 30 : 46,
          height: isMobile ? 30 : 46, 
          minHeight: "auto",
          bgcolor: "#f5f5f5", 
          color: theme.Text1,
          "&:hover": {
            bgcolor: "#e0e0e0",
            transform: "translateY(-4px)",
            transition: "all 0.2s ease",
          },
          border: "2px solid #ddd",
          zIndex: 2000,
          boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease",
        }}
      >
        <NorthIcon
          fontSize={isMobile ? "small" : "medium"}
          sx={{
            color: "#555",
          }}
        />
      </Fab>
    </Zoom>
  );
};

export default FixedButton;
