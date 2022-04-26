import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const title = '"slow reveal" || "grove" || "ontonode"';

function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.dark" }}>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
