"use client";

import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { memo } from 'react';
import AnimatedBackground from './components/animated-background';
import ProjectImage from './components/project-image';
import { projectImages } from './constants';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const Hero = () => {
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
      <AnimatedBackground />
      
      {projectImages.map((src, index) => (
        <ProjectImage key={src + index} src={src} index={index} />
      ))}

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

        <MotionBox
          sx={{
            mt: 10,
            bottom: '15%',
            position: 'center',
            transform: 'translateX(-50%)',
            color: 'white',
            cursor: 'pointer',
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
};

export default memo(Hero);