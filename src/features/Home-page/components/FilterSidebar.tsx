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
import { useNavigate } from "react-router-dom";

// Map categories
const categories = [
  { name: "Woman’s Fashion", slug: "clothes" },
  { name: "Men’s Fashion", slug: "luxery" },
  { name: "Electronics", slug: "electronics" },
  { name: "Home & Lifestyle", slug: "furniture" },
  { name: "Sports & Outdoor", slug: "shoes" },
  { name: "Baby’s & Toys", slug: "babys-toys" },
  { name: "Groceries & Pets", slug: "testing" },
  { name: "Health & Beauty", slug: "luxery-2" },
];

const FilterSidebar: React.FC = () => {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string, name: string) => {
    setActive(name);
    navigate({ pathname: "/products", search: `?category=${slug}` });
    setOpen(false);
  };

  const categoryList = (
    <List disablePadding>
      {categories.map((cat, index) => (
        <ListItemButton
          key={`${cat.slug}-${index}`} // ✅ unique key
          onClick={() => handleCategoryClick(cat.slug, cat.name)}
          sx={{
            py: 1.2,
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 0,
            fontSize: 15,
            fontWeight: active === cat.name ? 600 : 400,
            color: active === cat.name ? theme.Button2 : theme.Text1,
            "&:hover": {
              bgcolor: "transparent",
              color: theme.Button2,
            },
          }}
        >
          <Typography sx={{ fontSize: 15 }}>{cat.name}</Typography>
          {(index === 0 || index === 1) && (
            <ArrowForwardIosIcon
              sx={{
                fontSize: 14,
                color: active === cat.name ? theme.Button2 : theme.Text1,
              }}
            />
          )}
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <>
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
                height: "80%",
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
