import React from "react";
import { Box, Skeleton } from "@mui/material";

const WishlistSkeletonCard: React.FC = () => {
  return (
    <Box
      sx={{
        width: 200,
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 1,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 1 }} />
      <Skeleton variant="text" width="80%" height={25} sx={{ mt: 1 }} />
      <Skeleton variant="text" width="50%" height={20} />
      <Skeleton variant="text" width="60%" height={20} />
    </Box>
  );
};

export default WishlistSkeletonCard;
