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
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' }
];

const NAV_HEIGHT = 80; // ナビゲーションバーの高さ

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const scrollToSection = (href: string) => {
        if (href === '#hero') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const element = document.querySelector(href);
            if (element) {
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - NAV_HEIGHT;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    // スクロール処理
    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            const scrollPosition = window.scrollY;
            const offset = NAV_HEIGHT + 20; // ナビゲーションバーの高さ + 追加マージン
    
            // 固定位置の設定
            setIsFixed(scrollPosition > heroHeight - offset);
    
            // アクティブセクションの検出
            const sections = navItems.map(item => ({
                id: item.href.slice(1),
                element: document.getElementById(item.href.slice(1))
            }));
    
            // Homeセクションの特別処理
            if (scrollPosition < heroHeight / 2) {
                setActiveSection('hero');
                return;
            }
    
            // 各セクションの位置を確認
            let currentSection = '';
            sections.forEach(({ id, element }) => {
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // 画面上部から要素のトップまでの距離がオフセット内にある場合
                    if (rect.top <= offset && rect.bottom > offset) {
                        currentSection = id;
                    }
                }
            });
    
            if (currentSection) {
                setActiveSection(currentSection);
            }
        };
    
        // スクロールイベントリスナーの設定
        window.addEventListener('scroll', handleScroll);
        // 初期状態の設定
        handleScroll();
    
        // クリーンアップ
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* ハンバーガーメニュー - z-indexとpointer-eventsの調整のみ */}
            <AppBar 
                position="fixed" 
                sx={{ 
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                    zIndex: 2000, // より高いz-indexに設定
                    pointerEvents: 'none', // AppBar自体はポインターイベントを無効化
                }}
            >
                <Toolbar 
                    sx={{ 
                        justifyContent: 'flex-end',
                    }}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        onClick={() => setIsDrawerOpen(true)}
                        sx={{ 
                            color: 'grey.800',
                            pointerEvents: 'auto', // ボタンのみポインターイベントを有効化
                            position: 'relative',
                        }}
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
                            zIndex: 1400, // ハンバーガーメニューより低く、ナビゲーションより高い
                        }
                    }
                }}
                sx={{
                    zIndex: 2100, // ドロワー本体は最前面のまま
                    '& .MuiDrawer-paper': {
                        zIndex: 2100, // ドロワーのペーパー要素も最前面に
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

            {/* ナビゲーションボタン - pointer-eventsとz-indexの調整 */}
            <Box
                sx={{
                    position: isFixed ? 'fixed' : 'absolute',
                    top: isFixed ? '0' : 'auto',
                    bottom: isFixed ? 'auto' : '0rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    transition: 'all 0.3s ease',
                    zIndex: 1500, // ハンバーガーメニューより低いz-index
                    width: '100%',
                    bgcolor: 'rgb(239, 239, 239)',
                    pointerEvents: 'auto',
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
                                scrollToSection(item.href);
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