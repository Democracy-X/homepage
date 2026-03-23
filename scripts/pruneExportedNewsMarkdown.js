/**
 * public/images/news → content/news のシンボリックリンクのため、
 * 静的書き出し時に本文 index.md まで out/ に含まれる。公開サイトでは不要なので削除する。
 */
const fs = require('fs');
const path = require('path');

const OUT_NEWS = path.join(__dirname, '..', 'out', 'images', 'news');

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (name.isFile() && name.name === 'index.md') {
      fs.unlinkSync(p);
      console.log(`Removed ${path.relative(process.cwd(), p)}`);
    }
  }
}

walk(OUT_NEWS);
