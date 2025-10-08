/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface HeaderSearchBarProps {
  theme: any;
  searchStore: any;
  isMobile: boolean;
}

const HeaderSearchBar: React.FC<HeaderSearchBarProps> = ({
  theme,
  searchStore,
  isMobile,
}) => {

  if (isMobile) {
    return (
      <IconButton onClick={() => searchStore.setOpen(true)}>
        <SearchIcon fontSize="large" sx={{ color: theme.Text1 }} />
      </IconButton>
    );
  }

  
  return (
    <Box
      onClick={() => searchStore.setOpen(true)}
      sx={{
        bgcolor: theme.disabledBg,
        borderRadius: 1,
        px: 1.5,
        py: 1.0,
        display: "flex",
        alignItems: "center",
        width: 250,
        cursor: "pointer",
      }}
    >
      <SearchIcon sx={{ fontSize: 20, color: theme.Text1, mr: 1 }} />
      <Typography sx={{ fontSize: 12, color: theme.Text1 }}>
        What are you looking for?
      </Typography>
      <Typography
        sx={{
          fontSize: 10,
          color: theme.Text1,
          ml: 3,
          px: 0.5,
          py: 0.2,
          borderRadius: 0.5,
        }}
      >
        Ctrl+/
      </Typography>
    </Box>
  );
};

export default HeaderSearchBar;
