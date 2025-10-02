import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  Typography,
  IconButton,
  Drawer,
  Button,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme as useMuiTheme } from "@mui/material/styles";
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
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const categoryList = (
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
                color: active === cat ? theme.Button2 : theme.Text1,
              }}
            />
          )}
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            bgcolor: theme.primary1,
            color: theme.Text1,
            width: 240,
            pr: 2,
            ml: 8,
            borderRight: "1px solid #eee",
          }}
        >
          {categoryList}
        </Box>
      )}

      {/* Mobile Filter Button + Drawer */}
      {isMobile && (
        <>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setOpen(true)}
            sx={{
              mb: 2,
              textTransform: "none",
              fontSize: 14,
              borderColor: theme.Text2,
              color: theme.Text1,
              "&:hover": {
                borderColor: theme.Button2,
                color: theme.Button2,
              },
            }}
          >
            Filters
          </Button>

          <Drawer
            anchor="bottom"
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
              sx: {
                height: "80%", // take most of screen
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                bgcolor: theme.primary1,
                color: theme.Text1,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderBottom: `1px solid ${theme.Text2}`,
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                Filters
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon sx={{ color: theme.Text1 }} />
              </IconButton>
            </Box>
            <Box sx={{ p: 2, overflowY: "auto" }}>{categoryList}</Box>
          </Drawer>
        </>
      )}
    </>
  );
};

export default FilterSidebar;
