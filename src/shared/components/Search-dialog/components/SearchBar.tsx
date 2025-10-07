import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchStore } from "../../../../store/searchStore";
import { useTheme as useAppTheme } from "../../../../theme/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  isLoading,
}) => {
  const { theme } = useAppTheme();
  const { open, setOpen } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [animate, setAnimate] = useState(false);

  const handleClear = () => setQuery("");
  const handleCloseDialog = () => {
    setOpen(false);
    setQuery("");
  };

  // ✅ Focus + animate when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        setAnimate(true);
        setTimeout(() => setAnimate(false), 600); // stop glow after 0.6s
      }, 150);
    }
  }, [open]);

  return (
    <Box display="flex" alignItems="center" mb={3}>
      <motion.div
        initial={{ scale: 0.97, boxShadow: "0 0 0px rgba(0,0,0,0)" }}
        animate={
          animate
            ? {
                scale: [1, 1.03, 1],
                boxShadow: [
                  `0 0 0px ${theme.Button2}`,
                  `0 0 12px ${theme.Button2}`,
                  `0 0 0px ${theme.Button2}`,
                ],
                transition: { duration: 1 },
              }
            : { scale: 1, boxShadow: "0 0 0px rgba(0,0,0,0)" }
        }
        style={{ flex: 1, borderRadius: "8px" }}
      >
        <TextField
          inputRef={inputRef}
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <SearchIcon sx={{ color: theme.Text1 }} />
                )}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {query && (
                  <IconButton onClick={handleClear} size="small">
                    <CloseIcon sx={{ color: theme.Text2 }} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
            sx: {
              fontSize: 16,
              bgcolor: theme.primary1,
              color: theme.Text1,
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            },
          }}
        />
      </motion.div>

      <IconButton
        onClick={handleCloseDialog}
        sx={{
          ml: 1,
          bgcolor: theme.Button2,
          color: theme.primary1,
          "&:hover": { bgcolor: theme.Button2 },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
