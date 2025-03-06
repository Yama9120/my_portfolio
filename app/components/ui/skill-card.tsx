'use client';

import { Card, CardContent, Typography, Box, Chip, Avatar } from '@mui/material';
import type { Skill } from '@/app/lib/data/skills';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
              <StarIcon key={index} sx={{ color: 'warning.main' }} />
            ) : (
              <StarBorderIcon key={index} sx={{ color: 'warning.main' }} />
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