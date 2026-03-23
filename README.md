# PLURALITY - Digital Experience Platform

![PLURALITY](https://img.shields.io/badge/PLURALITY-Digital%20Experience%20Platform-blueviolet)
![Next.js](https://img.shields.io/badge/Next.js-15.1.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0.0-06B6D4)

PLURALITY書籍風のデザインを取り入れた、シンプルで洗練されたデジタルプラットフォームのホームページです。

## ✨ デザイン特徴

- **PLURALITY風マルチカラー文字**: 各文字が異なる色で彩られた印象的なタイポグラフィ
- **デジタルノイズ効果**: 軽微なノイズエフェクトによる未来的な質感
- **ニューモーフィズム**: 控えめな立体感で洗練された印象
- **ダークテーマ**: 黒背景に色鮮やかな要素が映えるデザイン
- **レスポンシブ対応**: デスクトップからモバイルまで最適化

## 🚀 技術スタック

- **Next.js 15.1.4** - React フレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS 4.0.0** - ユーティリティファーストCSS
- **JetBrains Mono** - モダンなモノスペースフォント

## 🎯 ページ構成

- **About**: 企業・プロジェクト紹介セクション
- **News**: ニュース・お知らせ（記事は `content/news/<slug>/` にコロケーション。詳細は `docs/news-content.md`）
- **レスポンシブナビゲーション**: スムーズスクロール機能付き

## 🛠️ セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド（本番用）
npm run build

# 本番サーバーの起動
npm start
```

> **ニュースについて**: ソースは `content/news/<slug>/` のみ。`public/data/news.json` は `scripts/generateNewsData.js` が生成するため **Git には含めません**（`.gitignore` 済み）。画像は **`public/images/news` → `content/news` のシンボリックリンク**で配信し、スクリプトではコピーしません。  
> **`next build` だけ**を実行すると `news.json` が無く不具合になることがあります。**必ず `npm run build` または `npm run dev`** を使ってください。

開発サーバーは [http://localhost:3000](http://localhost:3000) で起動します。

### トラブルシューティング（dev で `Cannot find module './638.js'` など）

`.next` 内の webpack キャッシュが壊れているときに起きます（ビルド中断・クラウド同期・別プロセスとの競合など）。次で解消できます。

```bash
npm run clean
npm run dev
# まとめてやる場合
npm run dev:clean
```

本番ビルドも同様に不安なら `npm run build:clean` を使ってください。

## 🌐 GitHub Pages デプロイ

このプロジェクトはGitHub Pagesでデプロイするように設定されています。

### デプロイ手順

1. **リポジトリをGitHubにプッシュ**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **GitHub Pagesの設定**
   - リポジトリのSettings → Pages
   - Source: "GitHub Actions" を選択

3. **自動デプロイ**
   - `main`ブランチにプッシュすると自動的にデプロイされます
   - デプロイ状況はActionsタブで確認できます

### ローカルでの静的ビルド確認

```bash
# 静的ファイルをビルド
npm run build

# outディレクトリに静的ファイルが生成されます
```

## 📱 レスポンシブ対応

- **デスクトップ**: フル機能でのリッチな体験
- **タブレット**: 中間サイズに最適化されたレイアウト
- **モバイル**: タッチフレンドリーなインターフェース

## 🎨 カスタマイズ

### マルチカラー文字の色変更

`src/app/globals.css` の `.plurality-title span:nth-child(n)` セクションで、各文字の色をカスタマイズできます。

### ニューモーフィズム効果の調整

CSS変数を使用してシャドウの強度や色を調整できます：

```css
:root {
  --darker-bg: #111111;
  --light-shadow: #1a1a1a;
  --dark-shadow: #000000;
}
```

---

**PLURALITY Team** - デジタル技術を通じて新しい体験と価値を創造
