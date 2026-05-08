import React, { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";

function SearchBar({ onSearch, defaultValue }) {
  const [text, setText] = useState(defaultValue || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search by message"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </Stack>
    </form>
  );
}

export default SearchBar;
