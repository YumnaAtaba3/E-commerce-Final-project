/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface HeaderSearchBarProps {
  theme: any;
  searchStore: any;
  isMobile: boolean;
  color?: string;
  bgcolor?: string;
}

const searchBarStyles = {
  container: (theme: any, bgcolor?: string) => ({
    bgcolor: bgcolor || theme.primary2 || "#F2F2F2FF",
    borderRadius: 1,
    px: 1.5,
    py: 1.0,
    display: "flex",
    alignItems: "center",
    width: 250,
    cursor: "pointer",
    transition: "all 0.3s ease",
   
  }),
  icon: (color?: string) => ({
    fontSize: 20,
    color: color || "black",
    mr: 1,
  }),
  placeholder: (color?: string) => ({
    fontSize: 12,
    color: color || "black",
  }),
  shortcut: (color?: string, theme?: any) => ({
    fontSize: 10,
    color: color || theme?.Text2 || "black",
    ml: 3,
    px: 0.5,
    py: 0.2,
    borderRadius: 0.5,
    border: `1px solid ${color || theme?.Text2 || "black"}`,
  }),
};

const HeaderSearchBar: React.FC<HeaderSearchBarProps> = ({
  theme,
  searchStore,
  isMobile,
  color,
  bgcolor,
}) => {
  if (isMobile) {
    return (
      <IconButton onClick={() => searchStore.setOpen(true)}>
        <SearchIcon fontSize="large" sx={{ color: color || theme.Text1 }} />
      </IconButton>
    );
  }

  return (
    <Box
      onClick={() => searchStore.setOpen(true)}
      sx={searchBarStyles.container(theme, bgcolor)}
    >
      <SearchIcon sx={searchBarStyles.icon(color)} />
      <Typography sx={searchBarStyles.placeholder(color)}>
        What are you looking for?
      </Typography>
      <Typography sx={searchBarStyles.shortcut(color, theme)}>
        Ctrl+/
      </Typography>
    </Box>
  );
};

export default HeaderSearchBar;
