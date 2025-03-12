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
    Typography,
    Link, 
    Divider 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const NAV_HEIGHT = 80; // ナビゲーションバーの高さ
const MOBILE_BREAKPOINT = 660; // モバイル表示の閾値

const sectionColors = {
    hero: '#2196f3', // 青
    about: '#4caf50', // 緑
    projects: '#f50057', // ピンク
    skills: '#ff9800', // オレンジ
    default: '#666666', // デフォルトの色
};
  
const navItems = [
{ 
    name: 'Home', 
    href: '#hero',
    color: sectionColors.hero 
},
{ 
    name: 'About', 
    href: '#about',
    color: sectionColors.about 
},
{ 
    name: 'Projects', 
    href: '#projects',
    color: sectionColors.projects 
},
{ 
    name: 'Skills', 
    href: '#skills',
    color: sectionColors.skills 
}
];

export default function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [hamburgerOpacity, setHamburgerOpacity] = useState(1);
    const [lastClickedSection, setLastClickedSection] = useState('');
    const [headerOpacity, setHeaderOpacity] = useState(0);
    const [headerPosition, setHeaderPosition] = useState('absolute');

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

    const handleSectionClick = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
            
            // スクロール開始後すぐに画面左下でクリックを実行
            setTimeout(() => {
                // 画面の左下に実際の要素を作成してクリック
                const dummyElement = document.createElement('div');
                dummyElement.style.position = 'fixed';
                dummyElement.style.left = '0';
                dummyElement.style.bottom = '0';
                dummyElement.style.width = '1px';
                dummyElement.style.height = '1px';
                document.body.appendChild(dummyElement);
    
                // 実際のクリックイベントを発火
                dummyElement.click();
    
                // クリーンアップ
                document.body.removeChild(dummyElement);
            }, 100);
        }
    };

    // スクロール処理
    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            const scrollPosition = window.scrollY;
            const offset = NAV_HEIGHT + 20;

            // ヘッダーの透明度を計算
            // スクロール位置が画面高さの60%を超えたら徐々に不透明に
            const opacity = Math.min(
                1,
                Math.max(0, (scrollPosition - (heroHeight * 0.6)) / (heroHeight * 0.3))
            );
            setHeaderOpacity(opacity);

            // ヘッダーの位置を設定
            // 完全に不透明になったら固定位置に
            setHeaderPosition(opacity >= 1 ? 'fixed' : 'absolute');
            setIsFixed(opacity >= 1);
    
            // モバイル時のハンバーガーメニューの透明度制御
            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                const opacity = Math.max(0, 1 - (scrollPosition / 200));
                setHamburgerOpacity(opacity);
            } else {
                setHamburgerOpacity(1);
            }
    
            // アクティブセクションの検出を改善
            if (scrollPosition < heroHeight / 2) {
                setActiveSection('hero');
                setLastClickedSection('');  // スクロールで戻ってきたら初期化
                return;
            }
    
            // 各セクションの位置を確認して最も近いセクションを特定
            const sections = navItems.map(item => ({
                id: item.href.slice(1),
                element: document.getElementById(item.href.slice(1))
            }));
    
            let nearestSection = '';
            let minDistance = Infinity;
    
            sections.forEach(({ id, element }) => {
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const distance = Math.abs(rect.top - offset);
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestSection = id;
                    }
                }
            });
    
            if (nearestSection) {
                setActiveSection(nearestSection);
                setLastClickedSection('');  // スクロールで新しいセクションに入ったら初期化
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* ハンバーガーメニュー */}
            <AppBar 
                position="fixed" 
                sx={{ 
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                    zIndex: 2000,
                    pointerEvents: 'none',
                    opacity: hamburgerOpacity,
                    transition: 'opacity 0.3s ease',
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
                            color: headerOpacity >= 0.5 ? 'grey.800' : 'white',
                            pointerEvents: hamburgerOpacity > 0.1 ? 'auto' : 'none', // 透明度が低い場合はクリック無効化
                            position: 'relative',
                            transition: 'color 0.3s ease',
                            border: 'none',
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
                            zIndex: 1900, // ハンバーガーメニューより低く設定
                        }
                    },
                }}
                sx={{
                    zIndex: 2100, // Drawer全体のz-index
                    '& .MuiDrawer-paper': {
                        width: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        zIndex: 2100, // Drawer本体も同じz-index
                    }
                }}
            >
                {/* メインメニュー */}
                <Box sx={{ p: 3 }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.name}
                            fullWidth
                            onClick={() => {
                                scrollToSection(item.href);
                                setIsDrawerOpen(false);
                            }}
                            sx={{
                                py: 2,
                                justifyContent: 'flex-start',
                                color: 'grey.800',
                                fontSize: '1.2rem',
                            }}
                        >
                            {item.name}
                        </Button>
                    ))}
                </Box>

                {/* 連絡先情報 */}
                <Box sx={{ p: 3, bgcolor: 'grey.50' }}>
                    <Divider sx={{ mb: 3 }} />
                    
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Contact
                    </Typography>
                    
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
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

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Ryuki<br />
                        Frontend Developer<br />
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        © {new Date().getFullYear()} All rights reserved.
                    </Typography>
                </Box>
            </Drawer>

            {/* ナビゲーションボタン - pointer-eventsとz-indexの調整 */}
            <Box
                sx={{
                    position: headerPosition,
                    top: headerPosition === 'fixed' ? '0' : 'auto',
                    bottom: headerPosition === 'absolute' ? '0rem' : 'auto',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    transition: 'all 0.3s ease',
                    zIndex: 1500, // ハンバーガーメニューより低いz-index
                    width: '100%',
                    bgcolor: `rgba(239, 239, 239, ${headerOpacity})`,
                    backdropFilter: headerOpacity > 0 ? 'blur(8px)' : 'none',
                    boxShadow: headerOpacity >= 1 
                        ? '0 2px 4px rgba(0,0,0,0.1)' 
                        : 'none',
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
                            const sectionId = item.href.slice(1);
                            const isActive = activeSection === sectionId;
                            
                            return (
                                <Button
                                    key={item.name}
                                    component="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSectionClick(item.href);
                                    
                                        // 複数回の実際のクリックとタップを実行
                                        [100, 500].forEach(delay => {
                                            setTimeout(() => {
                                                // ダミー要素作成
                                                const dummyElement = document.createElement('button');
                                                dummyElement.style.position = 'fixed';
                                                dummyElement.style.left = '10px';
                                                dummyElement.style.top = '10px';
                                                dummyElement.style.width = '1px';
                                                dummyElement.style.height = '1px';
                                                dummyElement.style.padding = '0';
                                                dummyElement.style.border = 'none';
                                                dummyElement.style.opacity = '0';
                                                
                                                document.body.appendChild(dummyElement);
                                                
                                                // クリックイベント
                                                dummyElement.click();
                                                
                                                // タップイベント
                                                const touchStartEvent = new TouchEvent('touchstart', {
                                                    bubbles: true,
                                                    cancelable: true,
                                                    view: window,
                                                    touches: [
                                                        new Touch({
                                                            identifier: 1,
                                                            target: dummyElement,
                                                            clientX: 10,
                                                            clientY: 10,
                                                            pageX: 10,
                                                            pageY: 10
                                                        })
                                                    ]
                                                });
                                                
                                                const touchEndEvent = new TouchEvent('touchend', {
                                                    bubbles: true,
                                                    cancelable: true,
                                                    view: window
                                                });
                                                
                                                dummyElement.dispatchEvent(touchStartEvent);
                                                dummyElement.dispatchEvent(touchEndEvent);
                                                
                                                // 要素を削除
                                                document.body.removeChild(dummyElement);
                                            }, delay);
                                        });
                                    }}
                                    sx={{
                                        color: headerOpacity >= 0.5 
                                            ? (isActive ? item.color : sectionColors.default)
                                            : 'white',
                                        fontSize: isActive ? '1.2rem' : '1.1rem',
                                        fontWeight: isActive ? 'bold' : 'normal',
                                        position: 'relative',
                                        padding: '8px 16px',
                                        cursor: 'pointer',
                                        // ボーダーを削除
                                        border: 'none',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: headerOpacity >= 0.5 ? 0 : 'auto',
                                            bottom: headerOpacity >= 0.5 ? 'auto' : 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: isActive ? '100%' : '0%',
                                            height: '2px',
                                            backgroundColor: isActive 
                                                ? item.color 
                                                : 'transparent',
                                            transition: 'all 0.3s ease',
                                        },
                                        '&:hover': {
                                            color: headerOpacity >= 0.5 ? item.color : item.color, // ホバー時は常にアイテムの色
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            '&::before': {
                                                width: '100%',
                                                backgroundColor: item.color,
                                            },
                                        },
                                        transition: 'all 0.3s ease',
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