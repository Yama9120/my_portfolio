export type Project = {
    id: number;
    title: string;
    description: string;
    detailedDescription: string;
    imageUrl: string;
    technologies: string[];
    githubUrl?: string;
    serviceUrl?: string;
    links?: string[];
};

export const projects: Project[] = [
    {
        id: 1,
        title: "らいぶらりん",
        description: "複数APIを使用して作成した図書館蔵書検索サービス",
        detailedDescription: [
            "初めて自らの手で開発したサービスです。",
            "サービスを構成するAPIとしては、",
            "・楽天ブックスAPI",
            "・図書館API「カーリル」",
            "・GoogleマップAPI",
            "です。その他にもfirebaseを用いてログイン機能の実装を行いました。サーバの構築にnginx、デプロイを行う部分でdockerを利用しました。",
            "ここで利用した技術は、すべてサービスを作成しながら学びつつ習得しました。",
            "現在はログイン時のみ利用可能な便利機能を随時追加する形で運営しております。"
        ].join('\n'),
        imageUrl: "images/projects/librarin_top.png",
        technologies: ["node.js", "JavaScript", "EJS", "CSS", "Firebase", "Docker", "Nginx"],
        githubUrl: "https://github.com/yourusername/todo-app",
        serviceUrl: "https://librarin.tgif.hiroshima-u.ac.jp/"
    },
    {
        id: 2,
        title: "食堂混雑状況可視化サービス",
        description: "大学の食堂のリアルタイム混雑状況をスマホで確認できるサービス",
        detailedDescription: [
            "初めてチームでの開発を行ったサービスです。",
            "主に担当したのは、フロントエンドの開発です。Figmaでデザインを作成し、Next.jsを使用して開発を行いました。MUIを使用することで、効率的にリッチなUIを実装することができました。",
            "混雑状況の取得に関しては、別チームIoTチームがBLEを用いて測定しており、そのデータをGoを用いてフロントに送信して連携しています。",
            "現在は、IoTチームは精度の向上・設置箇所の拡大を行っており、私たちのチームは、追加の機能を実装するために、GoでAPIの作成を行い、フロントを実装しております。"
        ].join('\n'),
        imageUrl: "images/projects/cafeteria_poster.png",
        technologies: ["Figma", "Next.js", "TypeScript", "Mui", "Go"],
        githubUrl: "https://github.com/yourusername/todo-app",
        serviceUrl: "https://prd-tgo-i-app.tgif.hiroshima-u.ac.jp/ja/cafeteria/congestion"
    },
    {
        id: 3,
        title: "ポスター・ノベルティ等",
        description: "アルバイト先のノベルティやセミナーのポスター",
        detailedDescription: [
            "不定期でデザイン関連の業務を行っています。",
            "主に使用しているツールはIllustrator、Photoshop、Clip Studio Paintです。ここでのスキルは、開発の際のデザインの部分にも活かされています。",
            "ヒアリングと制作を繰り返し、理想の形を作りあげられるように努力しています。",
        ].join('\n'),
        imageUrl: "images/projects/tgif_items.jpg",
        technologies: ["Illustrator", "Photoshop", "Clip Studio Paint", "Blender"],
        githubUrl: "https://github.com/yourusername/todo-app"
    },
    {
        id: 4,
        title: "ポートフォリオサイト",
        description: "Next.js、TypeScript、MUIを使用して作成した現在表示されているポートフォリオサイト",
        detailedDescription: [
            "現在表示されているこのポートフォリオサイトです。",
            "Figmaでデザインの大枠を決め、Next.js、TypeScript、MUIを使用して実装しました。",
            "Githubでmainブランチにpushされた際に自動でデプロイを行うように設定しています。",
            "また、このサイトでは、今までの開発の知識を活かし、効率的な開発を心がけております。具体的には、技術スタックやプロジェクトの詳細を表示するためのコンポーネントを作成し、再利用することで、効率的にコンテンツを追加できるようにしています。"
        ].join('\n'),
        imageUrl: "images/projects/portfolio_site.jpg",
        technologies: ["Figma", "Next.js", "TypeScript", "Mui"],
        githubUrl: "https://github.com/yourusername/portfolio",
        serviceUrl: "https://your-portfolio.vercel.app"
    },
    {
        id: 5,
        title: "チルパズル",
        description: "PythonのPyxelを使用して作成したパズル&箱庭ゲーム",
        detailedDescription: [
            "PythonのPyxelを使用して作成したパズル&箱庭ゲームです。",
            "プレイヤーは、パズルゲーム・釣りを行い、植物や魚を育て、育てたものや入手したアイテムを箱庭を自由に作ることができます。",
            "このゲームを作成することで、Pythonの基本的な文法や、Pyxelの使い方を学びました。",
            "現在制作途中ですが、完成した際には、販売サイトに登録するつもりです。"
        ].join('\n'),
        imageUrl: "images/projects/chill_title.png",
        technologies: ["Python", "Pyxel", "Clip Studio Paint"],
        githubUrl: "https://github.com/yourusername/todo-app",
        serviceUrl: "https://your-portfolio.vercel.app"
    },
    {
        id: 6,
        title: "Youtubeチャット拡張機能",
        description: "Youtubeのチャット欄を好みの位置に表示するChrome拡張機能",
        detailedDescription: [
            "Youtubeのチャット欄を好みの位置に表示するChrome拡張機能です。",
            "Youtubeのチャット欄は、通常全画面表示ではない場合に右側や下側に表示されますが、この拡張機能を使用することで、全画面表示時に、四隅の何処か・ポップアップとして表示することができます。",
            "この拡張機能を作成することで、Chrome拡張機能の作り方を学びました。",
            "また、この拡張機能を作成することで、不便だと感じる部分を自分で解決することができるということを学びました。"
        ].join('\n'),
        imageUrl: "images/projects/youtube_chat.jpg",
        technologies: ["TypeScript"],
        githubUrl: "https://github.com/yourusername/todo-app",
        serviceUrl: "https://your-portfolio.vercel.app"
    },
];