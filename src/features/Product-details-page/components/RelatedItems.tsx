import React from "react";
import {
  Box,
  Typography,
  Grid,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import ProductCard from "../../../shared/components/Product-card";
import { useTheme } from "../../../theme/ThemeProvider";
import { motion, type Variants, type Easing } from "framer-motion";

interface RelatedItem {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  img: string;
}

interface RelatedItemsProps {
  items: RelatedItem[];
}

// ✅ Typed variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // each child appears one after another
    },
  },
};

// ✅ Fix typing for "ease"
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as Easing, // ✅ TypeScript-safe fix
    },
  },
};

const RelatedItems: React.FC<RelatedItemsProps> = ({ items }) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  return (
    <Box mt={10} pl={isMobile ? 0 : 18}>
      {/* Section Header */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        mb={2}
        sx={{ flexWrap: "wrap" }}
      >
        <Box
          sx={{
            minWidth: 20,
            width: { xs: 15, sm: 20 },
            height: { xs: 30, sm: 40 },
            bgcolor: theme.Button2 || "#DB4444",
            borderRadius: 1,
            flexShrink: 0,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: theme.Button2 || "#DB4444",
            fontSize: isMobile ? 13 : 18,
          }}
        >
          Related Items
        </Typography>
      </Box>

      {/* Cards Grid with animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid
          container
          spacing={3}
          justifyContent={isMobile ? "center" : "flex-start"}
        >
          {items.map((item) => (
            <Grid key={item.id}>
              <motion.div variants={itemVariants}>
                <ProductCard {...item} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default RelatedItems;
