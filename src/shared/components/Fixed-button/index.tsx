import React, { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import NorthIcon from "@mui/icons-material/North"; // سهم كامل للأعلى
import { useTheme } from "../../../theme/ThemeProvider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme as useMuiTheme } from "@mui/material/styles";

const FixedButton: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [showButton, setShowButton] = useState(false);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show button after scrolling down a bit
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
          bottom: isMobile ? 70 : 100, // فوق الفوتر قليلاً
          right: isMobile ? 16 : 60,
          width: isMobile ? 30 : 46, // ✅ حجم الدائرة أصغر
          height: isMobile ? 30 : 46, // ✅ نفس الطول والعرض للحفاظ على الشكل الدائري
          minHeight: "auto",
          bgcolor: "#f5f5f5", // خلفية رمادية فاتحة
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
          fontSize={isMobile ? "small" : "large"} // ✅ أيقونة صغيرة لتناسب الحجم
          sx={{
            color: "#555",
          }}
        />
      </Fab>
    </Zoom>
  );
};

export default FixedButton;
