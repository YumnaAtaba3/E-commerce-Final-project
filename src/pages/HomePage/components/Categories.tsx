import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import CategoryCamera from "../../../assets/Category/Category-Camera.svg";
import CategoryCellPhone from "../../../assets/Category/Category-CellPhone.svg";
import CategoryComputer from "../../../assets/Category/Category-Computer.svg";
import CategoryGamepad from "../../../assets/Category/Category-Gamepad.svg";
import CategoryWatch from "../../../assets/Category/Category-SmartWatch.svg";
import CategoryHeadphone from "../../../assets/Category/Category-Headphone.svg";

const categories = [
  { name: "Phones", icon: CategoryCellPhone},
  { name: "Computers", icon:CategoryComputer},
  { name: "Smartwatch", icon:CategoryWatch },
  { name: "Camera", icon:CategoryCamera },
  { name: "Headphones", icon: CategoryHeadphone},
  { name: "Gaming", icon:CategoryGamepad },
];

const Categories: React.FC = () => {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Browse By Category
      </Typography>
      <Grid container spacing={3}>
        {categories.map((cat, i) => (
          <Grid item xs={6} sm={4} md={2} key={i}>
            <Card
              sx={{
                textAlign: "center",
                borderRadius: 2,
                boxShadow: 1,
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Box
                  component="img"
                  src={cat.icon}
                  alt={cat.name}
                  sx={{ width: 40, mb: 1 }}
                />
                <Typography sx={{ fontSize: 14 }}>{cat.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
