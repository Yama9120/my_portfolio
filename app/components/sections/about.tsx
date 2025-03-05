"use client";

import SectionContainer from '../ui/section-container';
import { Typography, Box, Grid } from '@mui/material';
import Image from 'next/image';

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
            <Grid container spacing={4} alignItems="center">
                {/* 左側: テキストコンテンツ */}
                <Grid item xs={12} md={7}>
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
                </Grid>
                {/* 右側: 画像 */}
                <Grid 
                    item 
                    xs={12} 
                    sm={8} 
                    md={5} 
                    sx={{
                        margin: {
                            xs: '0',
                            sm: '0 auto',
                            md: '0'
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: { 
                                xs: '200px',
                                sm: '250px',
                                md: '300px'
                            },
                            borderRadius: 2,
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            src="/images/about/my_image.jpg"
                            alt="Profile Image"
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                            priority
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </SectionContainer>
  );
}