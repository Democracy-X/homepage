const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// src/lib/news/articlePaths.ts と同じロジック（Node のビルドスクリプトから TS を直接 import しないため）
function resolveCoverImageUrl(coverImage, slug) {
  if (coverImage == null || typeof coverImage !== 'string') return undefined;
  const trimmed = coverImage.trim();
  if (trimmed === '') return undefined;
  if (trimmed.startsWith('/')) return trimmed;
  const name = trimmed.replace(/^\.\//, '');
  return `/images/news/${slug}/${name}`;
}

function rewriteMarkdownContentPaths(content, slug) {
  return content.split('](./').join(`](/images/news/${slug}/`);
}

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'news');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');

function createArticle(slug, metadata, content) {
  const publishedAt = new Date(metadata.publishedAt);
  const updatedAt = metadata.updatedAt ? new Date(metadata.updatedAt) : undefined;

  return {
    id: `${publishedAt.toISOString().split('T')[0]}-${slug}`,
    title: metadata.title,
    content,
    excerpt: metadata.excerpt,
    publishedAt: publishedAt.toISOString(),
    updatedAt: updatedAt ? updatedAt.toISOString() : undefined,
    tags: metadata.tags,
    author: metadata.author,
    slug,
    coverImage: resolveCoverImageUrl(metadata.coverImage, slug),
    imageAlt: metadata.imageAlt,
  };
}

function validateMetadata(data) {
  return !!(
    data &&
    typeof data.title === 'string' &&
    typeof data.publishedAt === 'string' &&
    typeof data.author === 'string' &&
    typeof data.excerpt === 'string' &&
    Array.isArray(data.tags)
  );
}

function listArticleDirs() {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const dirs = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    if (slug.startsWith('.')) continue;
    const indexPath = path.join(CONTENT_DIR, slug, 'index.md');
    if (fs.existsSync(indexPath)) {
      dirs.push({ slug, articleDir: path.join(CONTENT_DIR, slug) });
    }
  }

  return dirs;
}

async function generateNewsData() {
  try {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    if (!fs.existsSync(CONTENT_DIR)) {
      console.log('News content directory not found, creating empty data');
      fs.writeFileSync(path.join(OUTPUT_DIR, 'news.json'), JSON.stringify([], null, 2));
      return;
    }

    const articleDirs = listArticleDirs();
    const articles = [];

    for (const { slug, articleDir } of articleDirs) {
      try {
        const filePath = path.join(articleDir, 'index.md');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: metadata, content: rawContent } = matter(fileContent);

        if (!validateMetadata(metadata)) {
          console.warn(`Invalid metadata in: ${filePath}`);
          continue;
        }

        const content = rewriteMarkdownContentPaths(rawContent, slug);
        const article = createArticle(slug, metadata, content);
        articles.push(article);
      } catch (error) {
        console.error(`Failed to process ${slug}:`, error);
      }
    }

    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    fs.writeFileSync(path.join(OUTPUT_DIR, 'news.json'), JSON.stringify(articles, null, 2));

    console.log(`Generated news data: ${articles.length} articles`);
  } catch (error) {
    console.error('Failed to generate news data:', error);
    process.exit(1);
  }
}

generateNewsData();
