export type Skill = {
    id: number;
    name: string;
    icon: string;  // Material-UI iconの名前またはURLパス
    category: 'フロントエンド' | 'バックエンド' | 'ゲームエンジン' | 'デザイン' | 'その他';
    level: number;  // 1-5
    description: string;
};

export const skills: Skill[] = [
    {
        id: 1,
        name: "javascript",
        icon: "/images/projects/librarin_top.png",
        category: "フロントエンド",
        level: 4,
        description: "コンポーネント設計を意識し、hooks を活用した効率的な開発が可能です。Material UI などの UI ライブラリの使用経験も豊富です。",
    },
    {
        id: 2,
        name: "TypeScript",
        icon: "/images/skills/typescript.svg",
        category: "フロントエンド",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 3,
        name: "Node.js",
        icon: "/images/skills/nodejs.svg",
        category: "フロントエンド",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 4,
        name: "Next.js",
        icon: "/images/skills/nextjs.svg",
        category: "フロントエンド",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 5,
        name: "Go",
        icon: "/images/skills/go.svg",
        category: "バックエンド",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 6,
        name: "Pyxel (Python)",
        icon: "/images/skills/python.svg",
        category: "ゲームエンジン",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 7,
        name: "Unreal Engine",
        icon: "/images/skills/ue.svg",
        category: "ゲームエンジン",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 8,
        name: "Figma",
        icon: "/images/skills/figma.svg",
        category: "デザイン",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 9,
        name: "Illustrator",
        icon: "/images/skills/illustrator.svg",
        category: "デザイン",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 10,
        name: "Photoshop",
        icon: "/images/skills/photoshop.svg",
        category: "デザイン",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 11,
        name: "Clip Studio Paint",
        icon: "/images/skills/clipstudiopaint.svg",
        category: "デザイン",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 12,
        name: "Blender",
        icon: "/images/skills/blender.svg",
        category: "デザイン",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 13,
        name: "Firebase",
        icon: "/images/skills/firebase.svg",
        category: "その他",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    },
    {
        id: 14,
        name: "Docker",
        icon: "/images/skills/docker.svg",
        category: "その他",
        level: 3,
        description: "型安全性を重視した開発を心がけ、インターフェースや型定義を活用しています。",
    }
];