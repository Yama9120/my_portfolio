"use client";

import { Box, Typography } from "@mui/material";

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
            id={sectionid}
            sx={{
            position: 'absolute',
            top: -57, // コンテンツボックスより上に配置
            [align]: 0, // 左右の配置
            backgroundColor: color,
            px: 3,
            py: 1.5,
            border: '1px solid #e0e0e0',
            zIndex: 2,
            }}
        >
            <Typography 
            variant="h5" 
            component="h2"
            sx={{
                color: textcolor,
                fontWeight: 'bold',
                textAlign: 'center',
                letterSpacing: 1,  // 文字間隔を広げる
                textTransform: 'uppercase'  // 大文字表示
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
                p: 3
            }}
        >
            {children}
        </Box>
        </Box>
    );
}