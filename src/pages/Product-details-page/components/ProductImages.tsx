import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";

interface ProductImagesProps {
  thumbnails: string[];
  mainImage: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({
  thumbnails,
  mainImage,
}) => {
  const theme = useTheme();

  // Detect screen size
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // xs & sm
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // sm - md

  return (
    <Box
      display="flex"
      gap={2}
      flexDirection={isMobile ? "column" : "row"} // stack on mobile
    >
      {/* Thumbnails */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flexShrink: 0,
          flexDirection: isMobile ? "row" : "column", // horizontal thumbnails on mobile
          overflowX: isMobile ? "auto" : "visible", // scrollable on mobile
        }}
      >
        {thumbnails.map((src, idx) => (
          <Box
            key={idx}
            component="img"
            src={src}
            alt="thumb"
            sx={{
              width: isMobile ? 80 : 140,
              height: isMobile ? 80 : 140,
              borderRadius: 2,
              bgcolor: "#f9f9f9",
              border: "1px solid #ddd",
              cursor: "pointer",
              objectFit: "contain",
              "&:hover": { border: "2px solid #DB4444" },
            }}
          />
        ))}
      </Box>

      {/* Main Image */}
      <Box
        sx={{
          width: isMobile ? "100%" : isTablet ? 400 : 550,
          height: isMobile ? 300 : isTablet ? 400 : 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f9f9f9",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Box
          component="img"
          src={mainImage}
          alt="product"
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

export default ProductImages;
