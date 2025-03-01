import { Box, Typography, Grid } from '@mui/material';
import SkillCard from '../ui/skill-card';
import { skills } from '@/app/lib/data/skills';

export default function Skills() {
  return (
    <Box component="section" py={8}>
      <Typography variant="h2" textAlign="center" mb={4}>
        スキル
      </Typography>
      <Grid container spacing={3}>
        {skills.map((skill) => (
          <Grid item xs={12} sm={6} key={skill.id}>
            <SkillCard skill={skill} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}