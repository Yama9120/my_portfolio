"use client";

import { Box, Typography, Container } from "@mui/material";

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "grey.200",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: { xs: "3rem", md: "4.5rem" },
            fontWeight: "bold",
            color: "grey.800",
          }}
        >
          My Portfolio
        </Typography>
      </Container>
    </Box>
  );
}