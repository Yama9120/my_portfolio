"use client";

import { Box, Container, Typography, Link, Stack, IconButton, Grid, Divider } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.100',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
            {/* Contact Section */}
            <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Contact
                </Typography>
                <Stack direction="row" spacing={2}>
                    <IconButton
                        component={Link}
                        href={process.env.NEXT_PUBLIC_MY_GITHUB}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        sx={{ 
                        '&:hover': {
                            color: 'primary.main'
                        },
                        padding: '10px',  // アイコンボタンのパディングを増やす
                        }}
                    >
                        <GitHubIcon sx={{ fontSize: '2.5rem' }} />  {/* アイコンサイズを大きく */}
                    </IconButton>
                    <IconButton
                        component={Link}
                        href={process.env.NEXT_PUBLIC_MY_LINKEDIN}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        sx={{ 
                        '&:hover': {
                            color: 'primary.main'
                        },
                        padding: '10px',
                        }}
                    >
                        <LinkedInIcon sx={{ fontSize: '2.5rem' }} />
                    </IconButton>
                </Stack>
            </Grid>

            {/* Links Section */}
            <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Links
                </Typography>
                <Stack spacing={1}>
                <Link href="#" color="inherit" underline="hover">
                    Home
                </Link>
                <Link href="#about" color="inherit" underline="hover">
                    About
                </Link>
                <Link href="#projects" color="inherit" underline="hover">
                    Projects
                </Link>
                <Link href="#skills" color="inherit" underline="hover">
                    Skills
                </Link>
                </Stack>
            </Grid>

            {/* Info Section */}
            <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Info
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Name: {process.env.NEXT_PUBLIC_MY_NAME}<br />
                Frontend Developer<br />
                Deingner<br />
                <br />
                Email: {process.env.NEXT_PUBLIC_MY_EMAIL}<br />
                </Typography>
            </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
        >
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_MY_NAME}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}