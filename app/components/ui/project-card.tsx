'use client';

import { useState, useRef, useCallback } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Chip, 
  Box,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions 
} from '@mui/material';
import type { Project } from '@/app/lib/data/projects';
import { useRipple } from './ripple-effect';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

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
  const [dialogBorderColor, setDialogBorderColor] = useState(''); // ダイアログ用の色を保存
  const currentColorIndex = hoverCount % borderColorCycle.length;
  const borderColor = borderColorCycle[currentColorIndex];
  
  // 波紋効果のコンテキストを使用
  const { triggerRipple } = useRipple();
  
  // タイマーIDを保存するためのref
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClickOpen = () => {
    setDialogBorderColor(borderColor); // 現在の色をダイアログ用に保存
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

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md"
        fullWidth
        sx={{ zIndex: 20000 }}
      >
        <DialogTitle 
          sx={{ 
            borderBottom: `2px solid ${dialogBorderColor !== 'rgba(255, 255, 255, 0)' ? dialogBorderColor : '#ddd'}`,
            pb: 1
          }}
        >
          {project.title}
        </DialogTitle>
        <DialogContent sx={{ px: 3, pt: 3 }}>
          {/* 大きな画像を表示 */}
          <Box 
            sx={{ 
              width: '100%',
              height: { xs: '200px', sm: '300px', md: '500px' },
              position: 'relative',
              mb: 3,
              mt: 3,
              borderRadius: 1,
              overflow: 'hidden',
              boxShadow: `0 4px 8px ${dialogBorderColor !== 'rgba(255, 255, 255, 0)' ? dialogBorderColor.replace('1)', '0.3)') : 'rgba(0,0,0,0.2)'}`
            }}
          >
            <img 
              src={project.imageUrl} 
              alt={project.title}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
          </Box>

          {/* プロジェクトリンク */}
          <Box sx={{ mt: 3, mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {project.serviceUrl && (
              <Link
                href={project.serviceUrl}
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button 
                  variant="outlined"
                  endIcon={<LaunchIcon />}
                  sx={{ 
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    textTransform: 'none',
                    borderRadius: 2,
                    borderColor: dialogBorderColor !== 'rgba(255, 255, 255, 0)' ? dialogBorderColor : 'primary.main',
                    color: dialogBorderColor !== 'rgba(255, 255, 255, 0)' ? dialogBorderColor : 'primary.main',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderColor: dialogBorderColor !== 'rgba(255, 255, 255, 0)' ? dialogBorderColor : 'primary.dark',
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  サービスを見る
                </Button>
              </Link>
            )}
            
            {/* GitHubボタンも同様に変更 */}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button 
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  sx={{ 
                    // borderColorをdialogBorderColorに置き換え
                    borderColor: dialogBorderColor !== 'rgba(255, 255, 255, 0)' ? dialogBorderColor : 'primary.main',
                    color: dialogBorderColor !== 'rgba(255, 255, 255, 0)' ? dialogBorderColor : 'primary.main',
                    // 他のスタイルも同様に
                  }}
                >
                  GitHub
                </Button>
              </Link>
            )}
          </Box>

          {/* プロジェクト詳細情報 */}
          <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
            概要
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              mb: 3
            }}
          >
            {project.detailedDescription}
          </Typography>
          
          {/* 技術スタック */}
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            使用技術
          </Typography>
          
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
            {project.technologies.map((tech) => (
              <Chip 
                key={tech} 
                label={tech}
                sx={{ 
                  borderColor: borderColor !== 'rgba(255, 255, 255, 0)' ? borderColor : undefined,
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}
              />
            ))}
          </Stack>
          
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              color: dialogBorderColor !== 'rgba(255, 255, 255, 0)' ? dialogBorderColor : undefined 
            }}
          >
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}