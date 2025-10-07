import React, { useState } from "react";
import { Box, useTheme as useMuiTheme, useMediaQuery } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface ProductImagesProps {
  thumbnails: string[];
  mainImage: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({
  thumbnails,
  mainImage,
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md")); 

  const [currentImage, setCurrentImage] = useState(mainImage);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%", // <-- important
        height: isMobile ? 300 : isTablet ? 400 : 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor:theme.primary1,
        borderRadius: 2,
        p: 0, 
        pl:isMobile?0:20,
        overflow: "hidden",
      }}
    >
      {/* Thumbnails */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          gap: 2,
          flexShrink: 0,
          overflowX: "auto",
          maxWidth: "100%", // <-- prevent overflow
          pb: 1, // optional: padding bottom
        }}
      >
        {thumbnails.map((src, idx) => (
          <Box
            key={idx}
            component="img"
            src={src}
            alt={`thumb-${idx}`}
            sx={{
              width: isMobile ? 80 : 140,
              height: isMobile ? 80 : 140,
              borderRadius: 2,
              bgcolor: theme.primary1,
              cursor: "pointer",
              objectFit: "contain",
              border: currentImage === src ? "2px solid #DB4444" : "none",
              transition: "border 0.2s",
              "&:hover": { border: "2px solid #DB4444" },
            }}
            onClick={() => setCurrentImage(src)}
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
          src={currentImage}
          alt="product"
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

export default ProductImages;
