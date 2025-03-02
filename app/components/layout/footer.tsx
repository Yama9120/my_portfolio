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
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{ 
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component={Link}
                href="mailto:your.email@example.com"
                aria-label="Email"
                sx={{ 
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                <EmailIcon />
              </IconButton>
              <IconButton
                component={Link}
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{ 
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                <LinkedInIcon />
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
              [Your Name]<br />
              Frontend Developer<br />
              Based in [Location]
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
        >
          © {new Date().getFullYear()} [Your Name]. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}