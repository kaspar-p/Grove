import * as React from "react";
import { Stack, Box } from "@mui/material";

import Slate from "../components/Slate";
import ToolSidebar from "../components/ToolSidebar";
import PropertySidebar from "../components/PropertySidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Deck() {
  return (
    <Box sx={{ height: "100vh" }} display="flex" flexDirection="column">
      <Header />
      <Stack direction="row" sx={{ height: "100%" }}>
        <ToolSidebar />
        <Slate />
        <PropertySidebar />
      </Stack>
      <Footer />
    </Box>
  );
}

export default Deck;
