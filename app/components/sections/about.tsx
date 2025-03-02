"use client";

import { Box, Container, Typography, Paper } from "@mui/material";

export default function About() {
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: "background.default"
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold"
          }}
        >
          About Me
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: "800px",
            mx: "auto",
            backgroundColor: "background.paper"
          }}
        >
          <Typography variant="body1" paragraph>
            はじめまして。私は[あなたの名前]です。
            フロントエンド開発を中心に活動しています。
          </Typography>
          <Typography variant="body1" paragraph>
            Next.js、TypeScript、Material UIなどのモダンな技術スタックを使用して
            Webアプリケーションの開発を行っています。
          </Typography>
          <Typography variant="body1">
            常に新しい技術に興味を持ち、学習を続けています。
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}