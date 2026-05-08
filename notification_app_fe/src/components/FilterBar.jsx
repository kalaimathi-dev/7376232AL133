import React from "react";
import { Stack, Button } from "@mui/material";

const filters = ["All", "Event", "Result", "Placement"];

function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 2 }}>
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? "contained" : "outlined"}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </Stack>
  );
}

export default FilterBar;
