"use client";

import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Button,
  Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
    { name: 'Home', href: '#' },
    { name: 'About Me', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' }
];

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isHeroSection, setIsHeroSection] = useState(true);

  // メニューの開閉処理
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // スクロール処理
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      setIsFixed(scrollPosition > heroHeight - 100);
      setIsHeroSection(scrollPosition < heroHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ハンバーガーメニュー */}
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ color: 'grey.800' }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {navItems.map((item) => (
              <MenuItem 
                key={item.name} 
                onClick={handleClose}
                component="a"
                href={item.href}
              >
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* ナビゲーションボタン */}
      <Box
        sx={{
          position: isFixed ? 'fixed' : 'absolute',
          top: isFixed ? '0' : 'auto',
          bottom: isFixed ? 'auto' : '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          transition: 'all 0.3s ease',
          zIndex: 100,
          width: '100%',
          opacity: isHeroSection ? 1 : 0,
          pointerEvents: isHeroSection ? 'auto' : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            {navItems.map((item) => (
              <Button
                key={item.name}
                href={item.href}
                variant="text"
                sx={{
                  color: 'grey.800',
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                  }
                }}
              >
                {item.name}
              </Button>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}