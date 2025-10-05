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
        mb: 2,
        gap: 2,
        maxWidth: 425,
        width: "100%",
      }}
    >
      {/* Image + Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box component="img" src={image} alt={name} sx={{ height: 54 }} />
        <Typography sx={{ fontSize: 16 }}>{name}</Typography>
      </Box>

      {/* Price */}
      <Typography sx={{ fontSize: 16 }}>{price}</Typography>
    </Box>
  );
};

export default ProductItem;
