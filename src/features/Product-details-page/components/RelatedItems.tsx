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

const RelatedItems: React.FC<RelatedItemsProps> = ({ items }) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  return (
    <Box mt={10}>
      {/* Section Header */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        mb={2}
        sx={{ flexWrap: "wrap" }} // prevents overflow on mobile
      >
        {/* Colored bar */}
        <Box
          sx={{
            minWidth: 20,
            width: { xs: 15, sm: 20 },
            height: { xs: 30, sm: 40 }, // responsive height
            bgcolor: theme.Button2 || "#DB4444", // fallback color
            borderRadius: 1,
            flexShrink: 0, // prevent shrinking
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.Button2 || "#DB4444",
            fontSize: isMobile ? 18 : 24,
          }}
        >
          Related Items
        </Typography>
      </Box>

      {/* Cards Grid */}
      <Grid
        container
        spacing={3}
        justifyContent={isMobile ? "center" : "flex-start"}
      >
        {items.map((item) => (
          <Grid item key={item.id} xs={isMobile ? 10 : 3}>
            <ProductCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedItems;
