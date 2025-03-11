'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, Typography, Box, Chip, Avatar } from '@mui/material';
import type { Skill } from '@/app/lib/data/skills';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useRipple } from './ripple-effect';

interface SkillCardProps {
  skill: Skill;
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

export default function SkillCard({ skill }: SkillCardProps) {
  const [hoverCount, setHoverCount] = useState(0);
  const currentColorIndex = hoverCount % borderColorCycle.length;
  const borderColor = borderColorCycle[currentColorIndex];
  
  // 波紋効果のコンテキストを使用
  const { triggerRipple } = useRipple();
  
  // タイマーIDを保存するためのref
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // 前回のタイマーがあれば解除
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
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
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          src={skill.icon}
          alt={skill.name}
          sx={{ 
            width: 40, 
            height: 40, 
            mr: 2,
            borderRadius: '8px',
            '& img': {  // Avatarの中の画像要素のスタイリング
              objectFit: 'contain',  // アスペクト比を保持しながら収める
              width: '60px',         // 実際の表示サイズを指定
              height: '60px',
            }
          }}
          variant="square"
          imgProps={{
            style: {
              maxWidth: '100%',
              maxHeight: '100%'
            }
          }}
        />
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
              {skill.name}
            </Typography>
            <Chip 
              label={skill.category}
              size="small"
              sx={{ 
                color: 
                  skill.category === 'フロントエンド' ? 'white' :
                  skill.category === 'バックエンド' ? 'white' :
                  skill.category === 'ゲームエンジン' ? 'black' :
                  skill.category === 'デザイン' ? 'black' :
                  'black',
                backgroundColor: 
                  skill.category === 'フロントエンド' ? 'primary.light' :
                  skill.category === 'バックエンド' ? 'secondary.light' :
                  skill.category === 'ゲームエンジン' ? 'lightgreen' :
                  skill.category === 'デザイン' ? 'pink' :
                  'default',
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {[...Array(5)].map((_, index) => (
            index < skill.level ? (
              <StarIcon key={index} sx={{ 
                color: 'warning.main' 
              }} />
            ) : (
              <StarBorderIcon key={index} sx={{ 
                color: 'warning.main' 
              }} />
            )
          ))}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {skill.description}
        </Typography>

      </CardContent>
    </Card>
  );
}