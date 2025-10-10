import React, { useState } from "react";
import { Box, useTheme as useMuiTheme, useMediaQuery } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

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

  const mainImageVariants = {
    initial: { opacity: 0, x: -200 },
    animate: { opacity: 1, x: 4},
    exit: { opacity: 0, x: 200 },
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        height: isMobile ? 300 : isTablet ? 400 : 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: theme.primary1,
        borderRadius: 2,
        p: 0,
        pl: isMobile ? 0 : 20,
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
          maxWidth: "100%",
          pb: 1,
        }}
      >
        {thumbnails.map((src, idx) => (
          <motion.img
            key={idx}
            src={src}
            alt={`thumb-${idx}`}
            onClick={() => setCurrentImage(src)}
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: currentImage === src ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              width: isMobile ? 80 : 140,
              height: isMobile ? 80 : 140,
              borderRadius: 8,
              background: theme.primary1,
              cursor: "pointer",
              objectFit: "contain",
              border: currentImage === src ? "2px solid #DB4444" : "none",
            }}
          />
        ))}
      </Box>

      {/* Main Image with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage} // animate on image change
          variants={mainImageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            width: isMobile ? "100%" : isTablet ? 400 : 550,
            height: isMobile ? 300 : isTablet ? 400 : 600,
          }}
        >
          <Box
            component="img"
            src={currentImage}
            alt="product"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: 2,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default ProductImages;
