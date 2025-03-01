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
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={project.imageUrl}
          alt={project.title}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {project.description}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {project.technologies.map((tech) => (
              <Chip key={tech} label={tech} size="small" />
            ))}
          </Stack>
          <Button onClick={handleClickOpen} sx={{ mt: 2 }}>
            詳細を見る
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{project.title}</DialogTitle>
        <DialogContent>
          <Typography paragraph>
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