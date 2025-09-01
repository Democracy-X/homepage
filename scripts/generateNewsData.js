const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

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
    coverImage: metadata.coverImage,
    imageAlt: metadata.imageAlt
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

async function generateNewsData() {
  try {
    // 出力ディレクトリを作成
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // ニュースディレクトリが存在するかチェック
    if (!fs.existsSync(CONTENT_DIR)) {
      console.log('News content directory not found, creating empty data');
      fs.writeFileSync(
        path.join(OUTPUT_DIR, 'news.json'),
        JSON.stringify([], null, 2)
      );
      return;
    }

    const files = fs.readdirSync(CONTENT_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const articles = [];

    for (const file of markdownFiles) {
      try {
        const filePath = path.join(CONTENT_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const slug = path.basename(file, '.md');

        const { data: metadata, content } = matter(fileContent);
        
        if (validateMetadata(metadata)) {
          const article = createArticle(slug, metadata, content);
          articles.push(article);
        } else {
          console.warn(`Invalid metadata in file: ${file}`);
        }
      } catch (error) {
        console.error(`Failed to process ${file}:`, error);
      }
    }

    // 日付順でソート
    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // JSONファイルに出力
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'news.json'),
      JSON.stringify(articles, null, 2)
    );

    console.log(`Generated news data: ${articles.length} articles`);
  } catch (error) {
    console.error('Failed to generate news data:', error);
    process.exit(1);
  }
}

generateNewsData();
