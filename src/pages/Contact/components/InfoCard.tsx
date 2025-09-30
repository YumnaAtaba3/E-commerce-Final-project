import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface InfoCardProps {
  icon: string;
  alt: string;
  title: string;
  lines: string[];
  borderTop?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  alt,
  title,
  lines,
  borderTop,
}) => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderTop: borderTop ? `1px solid ${theme.borderColor}` : "none",
        pt: borderTop ? 4 : 0,
        mb: 4,
        pb: 0.7,
        bgcolor: theme.primary1,

      }}
    >
      {/* Icon + Heading */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: theme.Button2,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={icon}
            alt={alt}
            sx={{ width: 25, height: 25 }}
          />
        </Box>
        <Typography fontSize={18} fontWeight={600}>
          {title}
        </Typography>
      </Box>

      {/* Details */}
      {lines.map((txt, i) => (
        <Typography key={i} fontSize={14} mt={i === 0 ? 0.5 : 0.5}>
          {txt}
        </Typography>
      ))}
    </Box>
  );
};

export default InfoCard;
