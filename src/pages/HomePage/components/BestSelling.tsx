import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

const bestProducts = [
  {
    id: 1,
    name: "The north coat",
    price: "$260",
    img: "../../../assets/HomePage/jacket.png",
  },
  {
    id: 2,
    name: "Gucci duffle bag",
    price: "$960",
    img: "../../../assets/HomePage/jacket.png",
  },
  {
    id: 3,
    name: "RGB liquid CPU Cooler",
    price: "$160",
    img: "../../../assets/HomePage/jacket.png",
  },
  {
    id: 4,
    name: "Small bookshelf",
    price: "$360",
    img: "../../../assets/HomePage/jacket.png",
  },
];

const BestSelling: React.FC = () => {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Best Selling Products
      </Typography>
      <Grid container spacing={3}>
        {bestProducts.map((item) => (
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
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary">
          View All
        </Button>
      </Box>
    </Box>
  );
};

export default BestSelling;
