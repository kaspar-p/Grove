import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        textAlign: "center",
      }}
    >
      <Typography>Copyright Semantic Arts, Inc.</Typography>
    </Box>
  );
}

export default Footer;
