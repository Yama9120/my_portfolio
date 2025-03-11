"use client";

import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Motion componentsの定義を変更
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function Hero() {
  const theme = useTheme();
  const { scrollY } = useScroll();
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