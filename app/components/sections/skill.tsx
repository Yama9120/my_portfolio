import { Box, Typography, Grid } from '@mui/material';
import SkillCard from '../ui/skill-card';
import { skills } from '@/app/lib/data/skills';
import SectionContainer from '../ui/section-container';

export default function Skills() {
    return (
        <SectionContainer
            title="Skills"
            sectionid="skills"
            align="left"
            color="#ff9800"
            textcolor="white"
          >
            <Box sx={{ p: 4 }}>
                <Grid container spacing={3}>
                    {skills.map((skill) => (
                        <Grid item xs={12} sm={6} key={skill.id}>
                            <SkillCard skill={skill} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </SectionContainer>
    );
}