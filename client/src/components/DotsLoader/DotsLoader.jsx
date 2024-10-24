import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function DotsLoader() {
  return (
    <Box sx={{ width: 500 }}>
      <Skeleton animation="wave" />
    </Box>
  );
}
