"use client";

import { Box, Container, Typography, Link, Stack, IconButton, Paper } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SectionContainer from "../ui/section-container";

export default function Contact() {
  return (
    <SectionContainer title="Contact" align="right">
      <Box sx={{ p: 4 }}>
        
          <Typography variant="body1" paragraph>
            お問い合わせやご連絡は以下からお願いします。
          </Typography>
          
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
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
              <GitHubIcon fontSize="large" />
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
              <EmailIcon fontSize="large" />
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
                <LinkedInIcon fontSize="large" />
            </IconButton>
          </Stack>

      </Box>
    </SectionContainer>
  );
}