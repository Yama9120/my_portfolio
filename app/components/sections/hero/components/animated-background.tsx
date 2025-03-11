import { memo } from 'react';
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { ANIMATION_CONFIG } from '../constants';

const MotionBox = motion(Box);

const AnimatedBackground = () => (
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
      duration: ANIMATION_CONFIG.BACKGROUND_DURATION,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

export default memo(AnimatedBackground);