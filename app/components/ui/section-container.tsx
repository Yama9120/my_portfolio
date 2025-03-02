"use client";

import { Box, Typography } from "@mui/material";

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
        width: 'calc(100% - 48px)',
        position: 'relative',
        mb: 8,
        mt: 15, // タイトルのためのスペースを確保
        mx: 'auto',
        maxWidth: '1200px',
      }}
    >
      {/* タイトル部分 - コンテンツの上部に配置 */}
      <Box
        sx={{
          position: 'absolute',
          top: -57, // コンテンツボックスより上に配置
          [align]: 0, // 左右の配置
          backgroundColor: 'white',
          px: 3,
          py: 1.5,
          border: '1px solid #e0e0e0',
          zIndex: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      </Box>

      {/* メインコンテンツボックス */}
      <Box
        sx={{
          backgroundColor: 'white',
          width: '100%',
          border: '1px solid #e0e0e0',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}