import React, { useState } from "react";
import { Box, List, ListItemButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "../../../theme/ThemeProvider";

const categories = [
  "Woman’s Fashion",
  "Men’s Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Sports & Outdoor",
  "Baby’s & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

const FilterSidebar: React.FC = () => {
  const [active, setActive] = useState<string>("");
  const { theme } = useTheme();

  return (
    <Box sx={{bgcolor:theme.primary1,color:theme.Text1, width: 240, pr: 2, ml:8, borderRight: "1px solid #eee" }}>
      <List disablePadding>
        {categories.map((cat, index) => (
          <ListItemButton
            key={cat}
            onClick={() => setActive(cat)}
            sx={{
              py: 1.2,
              px: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 0,
              fontSize: 15,
              fontWeight: active === cat ? 600 : 400,
              color: active === cat ? theme.Button2 : theme.Text1,
              "&:hover": {
                bgcolor: "transparent",
                color: theme.Button2,
              },
            }}
          >
            <Typography sx={{ fontSize: 15 }}>{cat}</Typography>

            {/* Show arrow only for first 2 items */}
            {(index === 0 || index === 1) && (
              <ArrowForwardIosIcon
                sx={{
                  fontSize: 14,
                  color: active === cat ? theme.Button2 :theme.Text1,
                }}
              />
            )}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default FilterSidebar;
