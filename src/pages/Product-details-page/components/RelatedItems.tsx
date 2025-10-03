import React from "react";
import {
  Box,
  Typography,
  Grid,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";

import ProductCard from "../../../shared/components/ProductCard";
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
  const {theme} = useTheme();
    const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm")); // xs & sm screens

  return (
    <Box mt={10}>
      {/* Section Header */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Box
          sx={{
            width: 20,
            height: 40,
            bgcolor: theme.Button2,
            borderRadius: 1,
          }}
        />
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: theme.Button2 }}
        >
          Related Items
        </Typography>
      </Box>

      {/* Cards Grid */}
      <Grid
        container
        spacing={3}
        justifyContent={isMobile ? "center" : "flex-start"} // center on mobile
      >
        {items.map((item) => (
          <Grid item key={item.id} xs={isMobile ? 10 : 3}>
            {" "}
            {/* full width on mobile, 3 columns on desktop */}
            <ProductCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedItems;
