# My Portfolio

## 概要
Next.js + TypeScript + Material UIを使用したポートフォリオサイトです。

## 技術スタック
- Next.js (App Router)
- TypeScript
- Material UI
- Vercel

## 環境構築

### 必要条件
- Node.js
- npm

### インストール手順
```bash
# リポジトリのクローン
git clone https://github.com/yourusername/my_portfolio.git

# ディレクトリ移動
cd my_portfolio

# パッケージインストール
npm install
```

### 開発サーバー起動
```
npm run dev
```
開発サーバーが起動したら [http://localhost:3000](http://localhost:3000) にアクセス

### プロジェクト構成
```
my_portfolio/
├── app/                  # Appディレクトリ
│   ├── components/       # コンポーネントを格納するディレクトリ
│   │   ├── layout/       # ヘッダー・フッターなどの共通レイアウト
│   │   ├── providers/    # MUIテーマなどのプロバイダー設定
│   │   ├── sections/     # ページの各セクション（プロジェクト、スキルなど）
│   │   └── ui/           # 汎用的なUIコンポーネント（ボタン、カードなど）
│   ├── lib/              # ユーティリティ関数や共通ロジック
│   │   └── data/         # プロジェクトやスキルの情報を管理
│   ├── theme/            # MUIのテーマカスタマイズ設定
│   ├── layout.tsx        # アプリ全体の共通レイアウト定義
│   └── page.tsx          # トップページのメインコンポーネント
└── public/               # 静的ファイル用ディレクトリ
        └── images/       # 画像ファイルの格納場所
            └── projects/ # プロジェクトのスクリーンショット等
```

## 主な機能

### プロジェクト表示
- プロジェクトカードをクリックで詳細表示
- 使用技術のタグ表示
- GitHub・デモリンク

### スキルセット
- カテゴリ別のスキル表示
- レベル表示（プログレスバー）
