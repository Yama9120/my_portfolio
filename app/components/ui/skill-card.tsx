'use client';

import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import type { Skill } from '@/app/lib/data/skills';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {skill.category}
        </Typography>
        {skill.items.map((item) => (
          <Box key={item.name} sx={{ my: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">{item.name}</Typography>
              <Typography variant="body2">{item.level}/5</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={item.level * 20} 
              sx={{ height: 8, borderRadius: 2 }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}