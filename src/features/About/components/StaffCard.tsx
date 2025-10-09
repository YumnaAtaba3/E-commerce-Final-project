import React from "react";
import { Box, Card, Typography, IconButton } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

import twitter from "../../../assets/Footer/Icon-Twitter.svg";
import instagram from "../../../assets/Footer/icon-instagram.svg";
import linkedin from "../../../assets/Footer/Icon-Linkedin.svg";

interface StaffCardProps {
  img: string;
  name: string;
  role: string;
}

const StaffCard: React.FC<StaffCardProps> = ({ img, name, role }) => {
  const { theme } = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 3,
        maxWidth: "400px",
        p: 3,
        boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0px 8px 25px rgba(255, 100, 0, 0.5)",
        },
      }}
    >
      <Box
        component="img"
        src={img}
        alt={name}
        sx={{ width: "100%", borderRadius: 3, mb: 2 }}
      />
      <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{name}</Typography>
      <Typography sx={{ color: "#777", fontSize: 14, mb: 2 }}>
        {role}
      </Typography>

      <Box sx={{ display: "flex", gap: 0.5 }}>
        {[twitter, instagram, linkedin].map((icon, i) => (
          <IconButton
            key={i}
            sx={{
              p: 0.8,
              bgcolor: "transparent", // ✅ remove background color
              "&:hover": {
                bgcolor: "transparent", // no hover background
                transform: "scale(0.9)",
              },
            }}
          >
            <Box
              component="img"
              src={icon}
              alt={`social-icon-${i}`}
              sx={{
                width: 22,
                height: 22,
                filter: "brightness(0) saturate(100%)",
                transition: "transform 0.3s ease",
              }}
            />
          </IconButton>
        ))}
      </Box>
    </Card>
  );
};

export default StaffCard;
