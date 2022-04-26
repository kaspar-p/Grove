import React from "react";
import { Box, Stack } from "@mui/material";

function ToolSidebar() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        width: "5%",
        py: "15px",
        px: "5px",
      }}
    >
      <Stack sx={{ textAlign: "center" }} spacing={1}>
        <div>Tool 1</div>
        <div>Tool 2</div>
        <div>Tool 3</div>
        <div>Tool 4</div>
      </Stack>
    </Box>
  );
}

export default ToolSidebar;
