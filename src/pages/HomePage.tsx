import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router";
// import n3 from "n3";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        bgcolor: "primary.light",
        justifyContent: "center",
        paddingTop: "15%",
        alignItems: "flex-start",
      }}
    >
      <Stack
        direction="column"
        maxWidth="sm"
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          padding: 5,
          borderRadius: "8px",
        }}
        spacing={2}
      >
        <Typography variant="h4" textAlign="center">
          welcome to grove
        </Typography>
        <br />

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/deck/pres1")}
        >
          create a deck
        </Button>
        <Button variant="outlined" color="secondary">
          access an existing deck
        </Button>
      </Stack>
    </Box>
  );
}

export default HomePage;
