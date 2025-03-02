"use client";

import { Box, Typography, Container } from "@mui/material";

interface SectionContainerProps {
  title: string;
  align: 'left' | 'right';
  children: React.ReactNode;
}

export default function SectionContainer({ title, align, children }: SectionContainerProps) {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        position: 'relative',
        mb: 8,
      }}
    >
      {/* タイトルを含むヘッダー部分 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          [align]: 0,
          backgroundColor: 'primary.main',
          color: 'white',
          px: 4,
          py: 2,
          borderTopLeftRadius: align === 'right' ? 4 : 0,
          borderTopRightRadius: align === 'left' ? 4 : 0,
          zIndex: 1,
        }}
      >
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
      </Box>

      {/* メインコンテンツ部分 */}
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
          pt: 8,
          pb: 4,
          px: 4,
          boxShadow: 3,
          mt: 4,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}