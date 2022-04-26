import React from "react";
import { Box, Stack } from "@mui/material";

function PropertyBox({ num }: { num: number }) {
  return (
    <Box
      sx={{
        border: "gray 1px solid",
        height: "50px",
        pt: "25px",
        alignItems: "center",
      }}
    >
      Property {num}
    </Box>
  );
}

function PropertySidebar() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        width: "20%",
        py: "15px",
      }}
    >
      <Stack sx={{ textAlign: "center" }} spacing={1}>
        <PropertyBox num={1} />
        <PropertyBox num={2} />
        <PropertyBox num={3} />
        <PropertyBox num={4} />
        <PropertyBox num={5} />
      </Stack>
    </Box>
  );
}

export default PropertySidebar;
