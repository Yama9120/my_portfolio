export type Project = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    githubUrl?: string;
    demoUrl?: string;
};

export const projects: Project[] = [
    {
        id: 1,
        title: "ポートフォリオサイト",
        description: "Next.js、TypeScript、MUIを使用して作成したポートフォリオサイトです。",
        imageUrl: "https://placehold.co/600x400", // ダミー画像を使用
        technologies: ["Next.js", "TypeScript", "MUI"],
        githubUrl: "https://github.com/yourusername/portfolio",
        demoUrl: "https://your-portfolio.vercel.app"
    },
    {
        id: 2,
        title: "ToDoアプリ",
        description: "Reactを使用したシンプルなToDoアプリケーション",
        imageUrl: "https://placehold.co/600x400", // ダミー画像を使用
        technologies: ["React", "JavaScript", "CSS"],
        githubUrl: "https://github.com/yourusername/todo-app"
    }
];