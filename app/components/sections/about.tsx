"use client";

import SectionContainer from '../ui/section-container';
import { Typography, Box } from '@mui/material';

export default function About() {
  return (
    <SectionContainer 
        title="About Me"
        sectionid="about"
        align="left"
        color="#4caf50"
        textcolor='white'
    >
        <Box sx={{ p: 4 }}>
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
        </Box>
    </SectionContainer>
  );
}