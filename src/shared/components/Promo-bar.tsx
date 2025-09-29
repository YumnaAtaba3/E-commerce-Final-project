import React from "react";
import {
  AppBar,
  Box,
  Typography,
  Link,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,

} from "@mui/material";
import { useTheme as useMuiTheme, type Theme } from "@mui/material/styles";
import { useTheme } from "../../theme/ThemeProvider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface PromoBarProps {
  /** main promo text */
  message?: string;
  /** call-to-action link text */
  actionText?: string;
  /** call-to-action link URL */
  actionHref?: string;
  /** list of languages */
  languages?: string[];
}

/**
 * Reusable top promo bar with optional language selector.
 * Works on desktop & mobile.
 */
const PromoBar: React.FC<PromoBarProps> = ({
  message = "Summer Sale For All Swim Suits And Free Express Delivery – OFF 50%!",
  actionText = "ShopNow",
  actionHref = "#",
  languages = ["English", "Arabic", "French"],
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery((muiTheme as Theme).breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: theme.ButtonCard,
        height: isMobile ? 36 : 40,
        justifyContent: "center",
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          px: isMobile ? 1.5 : 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "lg",
          mx: "auto",
          width: "100%",
          flexWrap: "wrap", // allow wrap on very small screens
          rowGap: isMobile ? 0.5 : 0,
        }}
      >
        {/* Promo Text */}
        <Typography
          sx={{
            flex: 1,
            fontSize: isMobile ? "12px" : "14px",
            fontWeight: 400,
            fontFamily: "'Inter', sans-serif",
            color: theme.bgColor,
            textAlign: "center",
          }}
        >
          {message}{" "}
          <Link
            href={actionHref}
            sx={{
              color: theme.bgColor,
              fontWeight: 600,
              ml: 0.5,
              textDecoration: "underline",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {actionText}
          </Link>
        </Typography>

        {/* Language Selector */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={handleClick}
            sx={{
              color: theme.bgColor,
              p: 0,
              fontSize: isMobile ? "12px" : "14px",
            }}
          >
            <Typography
              sx={{
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: 500,
                mr: 0.5,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {languages[0]}
            </Typography>
            <KeyboardArrowDownIcon sx={{ fontSize: isMobile ? 16 : 18 }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                bgcolor: theme.ButtonCard,
                color: theme.bgColor,
              },
            }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang} onClick={handleClose}>
                {lang}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </AppBar>
  );
};

export default PromoBar;
