'use client';

import { useState } from 'react';
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

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        }
      }}>
        <CardMedia
          component="img"
          height="200"
          image={project.imageUrl}
          alt={project.title}
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
          <Button sx={{ mt: "10px" }}  onClick={handleClickOpen}>
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
          {/* 追加の詳細情報 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}