"use client";

import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import React from 'react';

// 画像位置の定義
const positions = [
  { top: '10%', left: '5%', right: 'auto', bottom: 'auto' },    // 左上
  { top: 'auto', left: 'auto', right: '5%', bottom: '10%' },    // 右下

];

// 画像パスの配列
const projectImages = [
  '/images/projects/cafeteria_poster.png',
  '/images/projects/librarin_top.png',
  '/images/about/my_image.jpg',
  '/images/projects/cafeteria_poster.png',
  '/images/projects/librarin_top.png',
  '/images/about/my_image.jpg',
];

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function Hero() {
  const theme = useTheme();
  const { scrollY } = useScroll();
  
  // 画像のサイズをレスポンシブに定義
  const IMAGE_WIDTH = {
    xs: 300,  // モバイル
    sm: 400,  // タブレット
    md: 600,  // 小型デスクトップ
    lg: 1000   // 大型デスクトップ
  };

  // 画像の高さを固定値で定義
  const IMAGE_HEIGHT = {
    xs: 169,  // 16:9のアスペクト比
    sm: 225,
    md: 338,
    lg: 600
  };

  const DISPLAY_DURATION = 6;

  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const words = "My Portfolio".split(" ");

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: 'relative',
        minHeight: "100vh",
        overflow: 'hidden',
        background: `linear-gradient(135deg, 
          ${theme.palette.primary.dark} 0%, 
          ${theme.palette.secondary.dark} 100%)`,
      }}
    >
      {/* 背景アニメーション */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          backgroundImage: [
            'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* 画像表示エリア */}
      {projectImages.map((src, index) => {
        const positionIndex = index % 2; // 左上と右下を交互に
        return (
          <MotionBox
            key={`${src}-${index}`}
            sx={{
              position: 'absolute',
              width: {
                xs: IMAGE_WIDTH.xs,
                sm: IMAGE_WIDTH.sm,
                md: IMAGE_WIDTH.md,
                lg: IMAGE_WIDTH.lg
              },
              height: {
                xs: IMAGE_HEIGHT.xs,
                sm: IMAGE_HEIGHT.sm,
                md: IMAGE_HEIGHT.md,
                lg: IMAGE_HEIGHT.lg
              },
              zIndex: 1,
              opacity: 0.15,
              borderRadius: 2,
              overflow: 'hidden',
              backdropFilter: 'blur(4px)',
              ...positions[positionIndex],
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.15, 0.15, 0]
            }}
            transition={{
              duration: DISPLAY_DURATION,
              times: [0, 0.2, 0.8, 1],
              delay: index * (DISPLAY_DURATION / 1.5),
              repeat: Infinity,
              repeatDelay: projectImages.length * (DISPLAY_DURATION / 2),
              ease: "easeInOut"
            }}
          >
            <Image
              src={src}
              alt={`Project ${index + 1}`}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                filter: 'brightness(0.9)',
              }}
              sizes="(max-width: 600px) 300px, (max-width: 960px) 400px, (max-width: 1280px) 600px, 800px"
            />
          </MotionBox>
        );
      })}

      {/* メインコンテンツ */}
      <Container 
        maxWidth="lg" 
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          {words.map((word, i) => (
            <MotionTypography
              key={i}
              variant="h1"
              // componentプロパティを削除し、Typography自体の設定を変更
              sx={{
                mt: 10,
                display: 'inline-block',
                mx: 2,
                fontSize: { xs: "3rem", md: "5rem", lg: "6rem" },
                fontWeight: 800,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
            >
              {word}
            </MotionTypography>
          ))}
        </Box>

        {/* サブテキスト */}
        <MotionTypography
          variant="h6"
          sx={{
            color: 'rgba(255,255,255,0.8)',
            mt: 3,
            textAlign: 'center',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Welcome to my creative space
        </MotionTypography>

        {/* スクロールダウン指示 */}
        <MotionBox
          sx={{
            mt: 10,
            bottom: '15%', // 下から15%の位置に配置
            position: 'center',
            transform: 'translateX(-50%)',
            color: 'white',
            cursor: 'pointer',
            // 視認性向上のためにテキストシャドウを追加
            filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.3))',
          }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ opacity }}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: { xs: 32, sm: 36, md: 40 } }} />
        </MotionBox>
      </Container>
    </Box>
  );
}