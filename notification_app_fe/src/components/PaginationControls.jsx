import React from "react";
import { Stack, Button, Typography } from "@mui/material";

function PaginationControls({ page, onPrev, onNext, disableNext }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 3 }}
    >
      <Button variant="outlined" onClick={onPrev} disabled={page === 1}>
        Previous
      </Button>
      <Typography>Page {page}</Typography>
      <Button variant="outlined" onClick={onNext} disabled={disableNext}>
        Next
      </Button>
    </Stack>
  );
}

export default PaginationControls;
