import { Box, Typography } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

const Breadcrumb = () => {
  const { theme } = useTheme();

  return (
    <Typography
      sx={{
        fontSize: "14px",
        color: theme.secondaryText,
        mb: 3,
      }}
    >
      Account / My Account / Product / View Cart /{" "}
      <Box component="span" sx={{ color: theme.Text1, fontWeight: 500 }}>
        Checkout
      </Box>
    </Typography>
  );
};

export default Breadcrumb;
