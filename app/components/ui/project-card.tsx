import { Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';
import type { Project } from '@/app/lib/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
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
      </CardContent>
    </Card>
  );
}