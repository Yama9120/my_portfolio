'use client';

import { useState, useRef, useCallback } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Chip, 
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions 
} from '@mui/material';
import type { Project } from '@/app/lib/data/projects';
import { useRipple } from './ripple-effect';

interface ProjectCardProps {
  project: Project;
}

// 枠線の色バリエーション
const borderColorCycle = [
  'rgba(255, 255, 255, 0)',      // 透明（初期状態）
  'rgba(255, 99, 71, 1)',        // トマト
  'rgba(70, 130, 180, 1)',       // スティールブルー
  'rgba(46, 139, 87, 1)',        // シーグリーン
  'rgba(138, 43, 226, 1)',       // ブルーバイオレット
  'rgba(255, 140, 0, 1)',        // ダークオレンジ
  'rgba(220, 20, 60, 1)',        // クリムゾン
  'rgba(32, 178, 170, 1)',       // ライトシーグリーン
  'rgba(75, 0, 130, 1)',         // インディゴ
  'rgba(255, 20, 147, 1)',       // ディープピンク
  'rgba(0, 128, 128, 1)',        // ティール
  'rgba(218, 165, 32, 1)',       // ゴールデンロッド
];

export default function ProjectCard({ project }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const currentColorIndex = hoverCount % borderColorCycle.length;
  const borderColor = borderColorCycle[currentColorIndex];
  
  // 波紋効果のコンテキストを使用
  const { triggerRipple } = useRipple();
  
  // タイマーIDを保存するためのref
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const lastHoverTimeRef = useRef<number>(0); // 新しいref を追加

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const now = Date.now();
      
      // 前回のタイマーがあれば解除
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      // カード固有のスロットリング (200ms)
      if (now - lastHoverTimeRef.current < 20) {
        // 色の変更だけ行い、波紋は生成しない
        setHoverCount(prev => prev + 1);
        return;
      }
      lastHoverTimeRef.current = now;
      
      // ホバー回数を増やす
      setHoverCount(prev => {
        const newCount = prev + 1;
        const newIndex = newCount % borderColorCycle.length;
        const newColor = borderColorCycle[newIndex];
        
        // 最初の透明色はスキップ
        if (newColor !== 'rgba(255, 255, 255, 0)') {
          try {
            // 現在のマウス位置を使って波紋を作成
            triggerRipple(e.clientX, e.clientY, newColor);
          } catch (error) {
            console.error('Failed to create ripple effect:', error);
          }
        }
        
        return newCount;
      });
      
      // 10秒後にホバー効果をリセットする設定
      timeoutRef.current = setTimeout(() => {
        setHoverCount(0);
      }, 10000); // 10秒後にリセット
  }, [triggerRipple]);

  return (
    <>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: 'white',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: borderColor,
          borderRadius: '8px',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.5s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: `0 8px 16px ${borderColor === 'rgba(255, 255, 255, 0)' ? 'rgba(0,0,0,0.2)' : borderColor.replace('1)', '0.3)')}`,
          }
        }}
        onMouseEnter={handleMouseEnter}
      >
        <CardMedia
          component="img"
          height="200"
          image={project.imageUrl}
          alt={project.title}
          sx={{ borderBottom: borderColor !== 'rgba(255, 255, 255, 0)' ? `1px solid ${borderColor}` : 'none' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            {project.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            paragraph
            sx={{ flexGrow: 1 }}
          >
            {project.description}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
            {project.technologies.map((tech) => (
              <Chip key={tech} label={tech} size="small" />
            ))}
          </Stack>
          <Button 
            sx={{ 
              mt: "10px",
              color: borderColor !== 'rgba(255, 255, 255, 0)' ? borderColor : undefined
            }} 
            onClick={handleClickOpen}
          >
            詳細を見る
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{project.title}</DialogTitle>
        <DialogContent>
        <Typography
            variant="body1"
            sx={{
                whiteSpace: 'pre-wrap',  // または 'pre-line'
                mb: 2
            }}
        >
            {project.detailedDescription}
        </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}