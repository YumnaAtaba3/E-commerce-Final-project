import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface StatCardProps {
  icon: string;
  value: string;
  text: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, text }) => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 4,
        width: 250,
        borderRadius: 0, 
        bgcolor: theme.bgColor,
        boxShadow: "2px 4px 10px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          bgcolor: theme.Button2, 
          boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
          "& .inner-circle": {
            bgcolor: "#fff",
            "& img": { filter: "invert(0)" }, 
          },
          "& p.value": { color: "#fff" }, 
          "& p.text": { color: "#fff" },
        },
      }}
    >
      {/* Circle with halo */}
      <Box
        className="circle-halo"
        sx={{
          width: 60,
          height: 60,
          mx: "auto",
          mb: 2,
          borderRadius: "50%",
          bgcolor: "rgba(128,128,128,0.8)", // gray halo
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0px 8px 16px rgba(128,128,128,0.3), 0px 4px 8px rgba(0,0,0,0.1)",
          transition: "0.3s",
        }}
      >
        {/* Inner Circle */}
        <Box
          className="inner-circle"
          sx={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            bgcolor: theme.Text1, 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "0.3s",
          }}
        >
          <Box
            component="img"
            src={icon}
            sx={{
              width: 30,
              filter: "invert(1)", // white icon default
              transition: "0.3s",
            }}
          />
        </Box>
      </Box>

      <Typography
        className="value"
        sx={{
          fontWeight: 700,
          fontSize: 24,
          mb: 1,
          transition: "0.3s",
          color: "#000",
        }}
      >
        {value}
      </Typography>
      <Typography
        className="text"
        sx={{ fontSize: 12, transition: "0.3s", color: theme.Text1}}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default StatCard;
