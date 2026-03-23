# ニュース記事の置き場所（`content/news`）

各記事は **1フォルダ1記事** とします。

## レイアウト

```
content/news/<slug>/
  index.md      # 本文（frontmatter 必須）
  cover.png     # カバー画像（任意・ファイル名は自由）
  ...           # その他アセット（画像など）
```

- **slug**: URL の `/news/<slug>` と一致させる（フォルダ名 = slug）
- **カバー画像**: frontmatter で `coverImage: "./cover.png"` のように **同一フォルダからの相対パス** を書きます（`/` で始まる絶対URLも可）
- 本文で同一フォルダの画像を使う場合は、マークダウンで `![](./画像ファイル名.png)` の形式にしてください

## 配信について

- ソースは **`content/news/` のみ** です。
- `public/images/news` は **`content/news` へのシンボリックリンク**（リポジトリに含める）。ビルドスクリプトは画像をコピーしません。
- `npm run dev` / `npm run build` の前に `generateNewsData.js` が **`public/data/news.json` だけ**を生成します（`.gitignore` 対象）。

## Windows について

`public/images/news` がシンボリックリンクのため、クローン後に壊れる場合は `git config core.symlinks true`（管理者権限が要る環境あり）や WSL の利用を検討してください。

## 補足

- 開発時、`/images/news/<slug>/index.md` にアクセスすると本文ファイルが返る可能性があります（シンボリックリンクのため）。本番の `out/` 書き出し後は `scripts/pruneExportedNewsMarkdown.js` で `index.md` を取り除きます。
