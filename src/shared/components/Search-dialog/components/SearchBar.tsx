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

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        setAnimate(true);
        setTimeout(() => setAnimate(false), 600);
      }, 150);
    }
  }, [open]);

  return (
    <Box display="flex" alignItems="center" mb={3}>
      <AnimatePresence>
        {open && (
          <motion.div
            key="search-bar"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.95,
              transition: { duration: 0.3 },
            }}
            style={{ flex: 1, borderRadius: 16, overflow: "clip" }}
          >
            <motion.div
              animate={
                animate
                  ? {
                      scale: [1, 1.03, 1],
                      boxShadow: [
                        `0 0 0px ${theme.Button2}`,
                        `0 0 16px ${theme.Button2}`,
                        `0 0 0px ${theme.Button2}`,
                      ],
                      transition: { duration: 1.2, repeat: 1 },
                    }
                  : { scale: 1, boxShadow: "0 0 0px rgba(0,0,0,0)" }
              }
              style={{
                flex: 1,
                borderRadius: 16,
                overflow: "clip",
              }}
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
                        <motion.div
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{
                            rotate: 0,
                            opacity: 1,
                            transition: { duration: 0.4, ease: "easeOut" },
                          }}
                        >
                          <SearchIcon sx={{ color: theme.Text1 }} />
                        </motion.div>
                      )}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {query && (
                        <motion.div whileTap={{ scale: 0.85 }}>
                          <IconButton onClick={handleClear} size="small">
                            <CloseIcon sx={{ color: theme.Text2 }} />
                          </IconButton>
                        </motion.div>
                      )}
                    </InputAdornment>
                  ),
                  sx: {
                    fontSize: 16,
                    bgcolor: theme.primary1,
                    color: theme.Text1,
                    borderRadius: 16,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid grey",
                      borderRadius: 0,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid darkgrey",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: `1px solid ${theme.Button2}`,
                    },
                  },
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ rotate: 90 }}>
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
      </motion.div>
    </Box>
  );
};

export default SearchBar;
