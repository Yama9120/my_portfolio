"use client";

import { useState, useEffect } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Drawer,
    Container,
    Button,
    Stack,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About Me', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' }
];

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // スクロール処理
    useEffect(() => {
        const handleScroll = () => {
        const heroHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        setIsFixed(scrollPosition > heroHeight - 100);

        // アクティブセクションの検出
        const sections = navItems.map(item => item.href.slice(1));
        sections.forEach(section => {
            if (section) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                setActiveSection(section);
                }
            }
            }
        });
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
                onClick={() => setIsDrawerOpen(true)}
                sx={{ color: 'grey.800' }}
            >
                <MenuIcon />
            </IconButton>
            </Toolbar>
        </AppBar>

        {/* サイドドロワー */}
        <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            SlideProps={{
            style: { width: '300px' }
            }}
            ModalProps={{
            BackdropProps: {
                sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                }
            }
            }}
        >
            <Box sx={{ pt: 6, px: 2 }}>
            {navItems.map((item) => (
                <Button
                key={item.name}
                href={item.href}
                onClick={() => setIsDrawerOpen(false)}
                fullWidth
                sx={{
                    py: 2,
                    justifyContent: 'flex-start',
                    color: 'grey.800',
                    fontSize: '1.2rem',
                    '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    }
                }}
                >
                <Typography variant="h6">{item.name}</Typography>
                </Button>
            ))}
            </Box>
        </Drawer>

      {/* ナビゲーションボタン */}
        <Box
            sx={{
                position: isFixed ? 'fixed' : 'absolute',
                top: isFixed ? '0' : 'auto',
                bottom: isFixed ? 'auto' : '0rem',
                left: '50%',
                transform: 'translateX(-50%)',
                transition: 'all 0.3s ease',
                zIndex: 100,
                width: '100%',
                bgcolor: 'rgb(239, 239, 239)', // 常に背景色を表示
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction="row"
                    spacing={4} // ボタン間隔をさらに広げる
                    justifyContent="center"
                    py={1} // パディングを増やす
                >
                {navItems.map((item) => {
                    const isActive = activeSection === item.href.slice(1) || 
                                    (item.href === '#hero' && activeSection === '');
                    return (
                    <Button
                        key={item.name}
                        href={item.href}
                        variant="text"
                        onClick={(e) => {
                            e.preventDefault();
                            if (item.href === '#hero') {
                                // Homeの場合は画面トップへスクロール
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                            } else {
                                const element = document.querySelector(item.href);
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        sx={{
                        color: 'grey.800',
                        fontSize: isActive ? '1.2rem' : '1.1rem',
                        fontWeight: isActive ? 'bold' : 'normal',
                        position: 'relative',
                        padding: '8px 16px', // ボタンのパディングを追加
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: isActive ? '100%' : '0%',
                            height: '2px',
                            backgroundColor: '#f50057', // アクティブ時の線の色を変更
                            transition: 'all 0.3s ease',
                        },
                        '&:hover::before': {
                            width: '100%',
                        },
                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                        }}
                    >
                        {item.name}
                    </Button>
                    );
                })}
                </Stack>
            </Container>
        </Box>
    </>
  );
}