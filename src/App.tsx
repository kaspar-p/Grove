import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "@mui/material/styles";

import HomePage from "./pages/HomePage";
import Deck from "./pages/Deck";

import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Helmet>
          <title>grove</title>
        </Helmet>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/deck/:presentationURI" element={<Deck />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
