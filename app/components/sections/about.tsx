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
                        はじめまして。{process.env.NEXT_PUBLIC_UNIV_NAME}の{process.env.NEXT_PUBLIC_MY_NAME}です。
                    </Typography>
                    <Typography variant="body1" paragraph>
                        大学では情報学を専攻し、アルバイトでWebアプリケーションの開発に挑戦したことをきっかけに、現在では主にWebアプリケーションの開発を行っております。
                    </Typography>
                    <Typography variant="body1" paragraph>
                        アルバイト先ではアプリケーションの開発の他にも、セミナーのポスターや、ノベルティ、Webサイトのデザインなども手掛けています。
                    </Typography>
                    <Typography variant="body1" paragraph>
                        また、個人開発では、このポートフォリオサイトの作成や、ゲーム制作も行っています。
                    </Typography>
                    <Typography variant="body1" paragraph>
                        趣味はゲーム、プログラミング、Vtuberやストリーマの配信視聴、などです。
                    </Typography>
                    <Typography variant="body1">
                        常に趣味の分野に対する新しい技術に興味を持ち、手を動かしながら学習を続けています。
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