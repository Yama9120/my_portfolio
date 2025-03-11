export const ANIMATION_CONFIG = {
  DISPLAY_DURATION: 6,
  FADE_TIMES: [0, 0.2, 0.8, 1],
  BACKGROUND_DURATION: 8,
} as const;

export const POSITIONS = [
  { top: '10%', left: '5%', right: 'auto', bottom: 'auto' },
  { top: 'auto', left: 'auto', right: '5%', bottom: '10%' },
] as const;

export const IMAGE_SIZES = {
  WIDTH: {
    xs: 300,
    sm: 400,
    md: 600,
    lg: 900
  },
  HEIGHT: {
    xs: 169,
    sm: 225,
    md: 338,
    lg: 550
  }
} as const;

export const projectImages = [
  '/images/projects/cafeteria_poster.jpg',
  '/images/projects/librarin_top.png',
  '/images/about/my_image.jpg',
  '/images/projects/cafeteria_poster.jpg',
  '/images/projects/librarin_top.png',
  '/images/about/my_image.jpg',
];