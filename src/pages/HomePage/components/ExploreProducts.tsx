import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const exploreProducts = [
  {
    id: 1,
    name: "Canon EOS DSLR Camera",
    price: "$360",
    img: "",
  },

];

const ExploreProducts: React.FC = () => {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Explore Our Products
      </Typography>
      <Grid container spacing={3}>
        {exploreProducts.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardMedia
                component="img"
                height="160"
                image={item.img}
                alt={item.name}
              />
              <CardContent>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {item.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, color: "red", fontWeight: 500 }}
                >
                  {item.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExploreProducts;
