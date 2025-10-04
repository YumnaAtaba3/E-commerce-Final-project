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
import { useTheme } from "../../../theme/ThemeProvider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface PromoBarProps {
  message?: string;
  actionText?: string;
  actionHref?: string;
  languages?: string[];
}

const PromoBar: React.FC<PromoBarProps> = ({
  message = "Summer Sale For All Swim Suits And Free Express Delivery – OFF 50%!",
  actionText = "Shop Now",
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
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1301, // higher than header
        bgcolor: theme.ButtonCard,
        height: isMobile ? 50 : 40,
        display: "flex",
        justifyContent: "center",
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          px: isMobile ? 0.5 : 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "lg",
          mx: "auto",
          width: "100%",
          flexWrap: "wrap",
          rowGap: isMobile ? 0.5 : 0,
        }}
      >
        <Typography
          sx={{
            flex: 1,
            fontSize: isMobile ? "9px" : "14px",
            fontWeight: isMobile ? 300 : 400,
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
