import React from "react";
import { Box, Card, Typography, IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTheme } from "../../../theme/ThemeProvider";

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
      <Box sx={{ display: "flex", gap: 1 }}>
        {[TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, i) => (
          <IconButton
            key={i}
            sx={{ color: theme.Text1, bgcolor: theme.primary1, gap: 9 }}
          >
            <Icon
              fontSize="medium"
              sx={{
                color: theme.Text1,
                bgcolor: theme.primary1,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: theme.Button2,
                  color: "#fff",
                  transform: "scale(0.9)",
                },
              }}
            />
          </IconButton>
        ))}
      </Box>
    </Card>
  );
};

export default StaffCard;
