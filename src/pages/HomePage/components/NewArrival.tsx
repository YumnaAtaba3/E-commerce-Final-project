import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

// ✅ Import images properly
import ps5Img from "../../../assets/Homepage/ps5-slim-goedkope-playstation_large 1.png";
import womanImg from "../../../assets/Homepage/attractive-woman-wearing-hat-posing-black-background 1.png";
import speakersImg from "../../../assets/Homepage/hero_endframe__cvklg0xk3w6e_large 2.svg";
import perfumeImg from "../../../assets/Homepage/cucci.png";

const newArrivals = [
  { id: 1, name: "PlayStation 5", img: ps5Img },
  { id: 2, name: "Women’s Collections", img: womanImg },
  { id: 3, name: "Speakers", img: speakersImg },
  { id: 4, name: "Perfume", img: perfumeImg },
];

const NewArrival: React.FC = () => {
  return (
    <Box sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        New Arrival
      </Typography>
      <Grid container spacing={3}>
        {newArrivals.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardMedia
                component="img"
                height="220"
                image={item.img}
                alt={item.name}
              />
              <CardContent>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {item.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewArrival;
