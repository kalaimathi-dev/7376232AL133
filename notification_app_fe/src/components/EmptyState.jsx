import React from "react";
import { Box, Typography } from "@mui/material";

function EmptyState({ message }) {
  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
}

export default EmptyState;
