"use client";

import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

// スライドインアニメーションの定義
const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

interface SectionContainerProps {
    title: string;
    sectionid?: string;
    align: 'left' | 'right';
    color?: string;
    textcolor?: string;
    children: React.ReactNode;
}

export default function SectionContainer({ 
    title,
    sectionid,
    align,
    color = 'white',
    textcolor = 'black',
    children
}: SectionContainerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // 一度表示されたら監視を終了
                }
            },
            {
                threshold: 0.1 // 10%表示されたらトリガー
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <Box
            component="section"
            ref={sectionRef}
            sx={{
                width: 'calc(100% - 48px)',
                position: 'relative',
                mb: 8,
                mt: 15,
                mx: 'auto',
                maxWidth: '1200px',
                opacity: isVisible ? 1 : 0,
                animation: isVisible 
                    ? `${align === 'left' ? slideInLeft : slideInRight} 0.8s ease-out forwards`
                    : 'none',
            }}
        >
            {/* タイトル部分 */}
            <Box
                id={sectionid}
                sx={{
                    position: 'absolute',
                    top: -57,
                    [align]: 0,
                    backgroundColor: color,
                    px: 3,
                    py: 1.5,
                    border: '1px solid #e0e0e0',
                    zIndex: 2,
                    opacity: isVisible ? 1 : 0,
                    animation: isVisible 
                        ? `${align === 'left' ? slideInLeft : slideInRight} 0.8s ease-out forwards`
                        : 'none',
                }}
            >
                <Typography 
                    variant="h5" 
                    component="h2"
                    sx={{
                        color: textcolor,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        letterSpacing: 1,
                        textTransform: 'uppercase'
                    }}
                >
                    {title}
                </Typography>
            </Box>

            {/* メインコンテンツボックス */}
            <Box
                sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    boxShadow: 1,
                    p: 3,
                    opacity: isVisible ? 1 : 0,
                    animation: isVisible 
                        ? `${align === 'left' ? slideInLeft : slideInRight} 0.8s ease-out forwards`
                        : 'none',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}