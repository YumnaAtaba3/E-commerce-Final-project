import React from "react";
import { Box, Typography, Link } from "@mui/material";

interface Props {
  deliveryIcon: string;
  returnIcon: string;
  isMobile: boolean;
}

const DeliveryReturnCard: React.FC<Props> = ({
  deliveryIcon,
  returnIcon,
  isMobile,
}) => (
  <Box
    sx={{
      border: "1px solid #ddd",
      borderRadius: 2,
      width: isMobile ? 130 : 320, // ✅ Smaller overall width
      height: isMobile ? "auto" : 150, // ✅ Auto height for flexibility
      display: "flex",
      flexDirection: "column",
      bgcolor: "#fff",
      overflow: "hidden",
      mt: 2,
      p: isMobile ? 1.5 : 2,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}
  >
    {/* Delivery */}
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1.5,
        mb: 1.5,
      }}
    >
      <Box
        component="img"
        src={deliveryIcon}
        alt="delivery"
        width={28}
        height={28}
      />
      <Box display="flex" flexDirection="column">
        <Typography fontSize={14} fontWeight={600} color="black">
          Free Delivery
        </Typography>
        <Link
          href="#"
          underline="always"
          sx={{
            fontSize: "11px",
            color: "black",
            fontWeight: 500,
            transition: "color 0.3s",
            "&:hover": { color: "#DB4444" },
          }}
        >
          Enter postal code for delivery
        </Link>
      </Box>
    </Box>

    <Box sx={{ height: "1px", bgcolor: "#eee", my: 1 }} />

    {/* Return */}
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Box
        component="img"
        src={returnIcon}
        alt="return"
        width={28}
        height={28}
      />
      <Box display="flex" flexDirection="column">
        <Typography fontSize={14} fontWeight={600} color="black">
          Return Delivery
        </Typography>
        <Typography fontSize={11} color="black">
          Free 30-day returns.{" "}
          <Link
            href="#"
            underline="always"
            sx={{
              color: "black",
              fontWeight: 500,
              "&:hover": { color: "#DB4444" },
            }}
          >
            Details
          </Link>
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default DeliveryReturnCard;
