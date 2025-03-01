import { Box, Typography, Grid } from '@mui/material';
import ProjectCard from '../ui/project-card';
import { projects } from '@/app/lib/data/projects';

export default function Projects() {
  return (
    <Box component="section" py={8}>
      <Typography variant="h2" textAlign="center" mb={4}>
        制作物
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}