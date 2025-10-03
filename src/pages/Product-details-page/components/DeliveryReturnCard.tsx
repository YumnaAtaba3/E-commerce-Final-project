import React from "react";
import { Box, Typography, Link } from "@mui/material";

interface Props {
  deliveryIcon: string;
  returnIcon: string;
}

const DeliveryReturnCard: React.FC<Props> = ({ deliveryIcon, returnIcon }) => (
  <Box
    sx={{
      border: "1px solid #ddd",
      borderRadius: 2,
      width: 400,
      height: 180,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      mt: 3,
      bgcolor: "#fff",
    }}
  >
    {/* Delivery */}
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: 2,
        gap: 2,
      }}
    >
      <Box component="img" src={deliveryIcon} alt="delivery" width={35} />
      <Box display="flex" flexDirection="column">
        <Typography fontSize={16} fontWeight={500} color="black">
          Free Delivery
        </Typography>
        <Link
          href="#"
          underline="always"
          sx={{
            fontSize: "12px",
            color: "black",
            fontWeight: 500,
            transition: "color 0.3s",
            "&:hover": { color: "#DB4444" },
          }}
        >
          Enter your postal code for Delivery Availability
        </Link>
      </Box>
    </Box>

    <Box sx={{ height: "1px", bgcolor: "#ddd", mx: 2 }} />

    {/* Return */}
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: 2,
        gap: 2,
      }}
    >
      <Box component="img" src={returnIcon} alt="return" width={35} />
      <Box display="flex" flexDirection="column">
        <Typography fontSize={16} fontWeight={500} color="black">
          Return Delivery
        </Typography>
        <Typography fontSize={12} color="black">
          Free 30 Days Delivery Returns.{" "}
          <Link
            href="#"
            underline="always"
            sx={{
              color: "black",
              fontWeight: 500,
              transition: "color 0.3s",
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
