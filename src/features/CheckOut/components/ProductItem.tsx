import { Box, Typography } from "@mui/material";

interface ProductItemProps {
  name: string;
  price: string;
  image: string;
}

const ProductItem = ({ name, price, image }: ProductItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1.5,
        gap: 6,
        maxWidth: 400,
        width: "100%",
      }}
    >
      {/* Image + Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{ height: 40, width: 40, objectFit: "contain" }}
        />
        <Typography sx={{ fontSize: 13, lineHeight: 1.2, maxWidth: 100 }}>
          {name}
        </Typography>
      </Box>

      {/* Price */}
      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{price}</Typography>
    </Box>
  );
};

export default ProductItem;
