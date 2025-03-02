"use client";

import SectionContainer from '../ui/section-container';
import { Box, Typography, Grid } from '@mui/material';
import ProjectCard from '../ui/project-card';
import { projects } from '@/app/lib/data/projects';

export default function Projects() {
    return (
        <SectionContainer title="Projects" align="right">
            <Box sx={{ p: 4 }}>
                <Grid container spacing={3}>
                    {projects.map((project) => (
                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                            <ProjectCard project={project} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </SectionContainer>
    );
}