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
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

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

interface FilterSidebarProps {
  onCategorySelect?: (slug?: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCategorySelect }) => {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (slug: string, name: string) => {
    setActive(name);

    const params = new URLSearchParams(location.search);
    params.set("category", slug);

    const existingFilter = params.get("filter");
    if (existingFilter) {
      params.set("filter", existingFilter);
    }

    if (onCategorySelect) {
      onCategorySelect(slug);
    } else {
      navigate({ pathname: "/products", search: `?${params.toString()}` });
    }

    setOpen(false);
  };

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // each item appears 0.1s after the previous
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  const categoryList = (
    <motion.div initial="hidden" animate="visible" variants={listVariants}>
      {categories.map((cat, index) => (
        <motion.div key={cat.slug} variants={itemVariants}>
          <ListItemButton
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
        </motion.div>
      ))}
    </motion.div>
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

      {/* Mobile Drawer */}
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
