import { memo } from 'react';
import Image from 'next/image';
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { ANIMATION_CONFIG, IMAGE_SIZES, POSITIONS, projectImages } from '../constants';

const MotionBox = motion(Box);

interface ProjectImageProps {
  src: string;
  index: number;
}

const ProjectImage = ({ src, index }: ProjectImageProps) => (
  <MotionBox
    sx={{
      position: 'absolute',
      width: IMAGE_SIZES.WIDTH,
      height: IMAGE_SIZES.HEIGHT,
      zIndex: 1,
      opacity: 0.15,
      borderRadius: 2,
      overflow: 'hidden',
      backdropFilter: 'blur(4px)',
      ...POSITIONS[index % 2],
    }}
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0, 0.15, 0.15, 0]
    }}
    transition={{
      duration: ANIMATION_CONFIG.DISPLAY_DURATION,
      times: ANIMATION_CONFIG.FADE_TIMES,
      delay: index * (ANIMATION_CONFIG.DISPLAY_DURATION / 1.5),
      repeat: Infinity,
      repeatDelay: projectImages.length * (ANIMATION_CONFIG.DISPLAY_DURATION / 2),
      ease: "easeInOut"
    }}
  >
    <Image
      src={src}
      alt={`Project ${index + 1}`}
      fill
      quality={1} // 画質を大幅に下げる（半透明の背景画像なので許容範囲）
      loading={index < 2 ? "eager" : "lazy"} // 最初の2枚のみeager、残りはlazy
      priority={index < 2} // 最初の2枚のみ優先読み込み
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
        filter: 'brightness(0.9)',
      }}
      sizes={`(max-width: 600px) ${IMAGE_SIZES.WIDTH.xs}px, 
              (max-width: 960px) ${IMAGE_SIZES.WIDTH.sm}px, 
              (max-width: 1280px) ${IMAGE_SIZES.WIDTH.md}px, 
              ${IMAGE_SIZES.WIDTH.lg}px`}
    />
  </MotionBox>
);

export default memo(ProjectImage);