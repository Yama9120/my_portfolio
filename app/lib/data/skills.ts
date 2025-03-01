export type Skill = {
    id: number;
    category: string;
    items: {
      name: string;
      level: number;  // 1-5
      icon?: string;
    }[];
};

export const skills: Skill[] = [
    {
        id: 1,
        category: "フロントエンド",
        items: [
            { name: "React", level: 4 },
            { name: "TypeScript", level: 3 },
            { name: "Next.js", level: 3 },
        ]
    },
    {
        id: 2,
        category: "バックエンド",
        items: [
            { name: "Node.js", level: 3 },
            { name: "Python", level: 4 },
        ]
    },
];