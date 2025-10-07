import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTheme } from "../../../theme/ThemeProvider";

const FixedButton: React.FC = () => {
  const { theme } = useTheme();
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      const footerHeight = 150; // adjust to your footer height

      // Show button only when footer is in view
      if (scrollY + windowHeight >= documentHeight - footerHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showButton) return null;

  return (
    <Fab
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        bottom: { xs: 80, sm: 40 },
        right: { xs: 20, sm: 40 },
        bgcolor: theme.Button2,
        color: theme.Text1,
        "&:hover": { bgcolor: theme.Button1 },
        zIndex: 1500,
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default FixedButton;
