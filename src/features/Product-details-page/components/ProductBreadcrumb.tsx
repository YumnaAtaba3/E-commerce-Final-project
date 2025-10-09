
import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../theme/ThemeProvider";

interface ProductBreadcrumbProps {
  productTitle: string;
  categoryName?: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({
  productTitle,
  categoryName,
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <Breadcrumbs
      separator="/"
      sx={{
        color: theme.Text1,
        fontSize: 14,
        mb: 4,
        overflowX: "auto",
        pl: { xs: 0, md: 2 },
        "& a, & span": { whiteSpace: "nowrap", cursor: "pointer" },
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          color: theme.disabledText,
          "&:hover": { textDecoration: "underline" },
        }}
        onClick={() => navigate("/")}
      >
        Home
      </Typography>

      {categoryName && (
        <Typography
          sx={{
            fontSize: 16,
            color: theme.disabledText,
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() =>
            navigate(`/products?categorySlug=${categoryName.toLowerCase()}`)
          }
        >
          {categoryName}
        </Typography>
      )}

      <Typography color={theme.Text1} fontSize={14}>
        {productTitle}
      </Typography>
    </Breadcrumbs>
  );
};

export default ProductBreadcrumb;
