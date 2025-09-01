import { promises as fs } from 'fs';
import path from 'path';
import { NewsArticle, NewsMetadata } from './types';
import { parseMarkdown } from './markdown';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'news');

// サーバーサイドでのみ実行される関数
export async function loadNewsArticles(): Promise<NewsArticle[]> {
  try {
    // ディレクトリが存在するかチェック
    try {
      await fs.access(CONTENT_DIR);
    } catch {
      // ディレクトリが存在しない場合は空配列を返す
      return [];
    }

    const files = await fs.readdir(CONTENT_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const articles: NewsArticle[] = [];

    for (const file of markdownFiles) {
      try {
        const filePath = path.join(CONTENT_DIR, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const slug = path.basename(file, '.md');

        const { metadata, content } = parseMarkdown(fileContent);
        const article = createArticle(slug, metadata, content);
        
        articles.push(article);
      } catch (error) {
        console.error(`Failed to process ${file}:`, error);
      }
    }

    // 日付順でソート
    return articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  } catch (error) {
    console.error('Failed to load articles:', error);
    return [];
  }
}

function createArticle(slug: string, metadata: NewsMetadata, content: string): NewsArticle {
  const publishedAt = new Date(metadata.publishedAt);
  const updatedAt = metadata.updatedAt ? new Date(metadata.updatedAt) : undefined;
  
  return {
    id: `${publishedAt.toISOString().split('T')[0]}-${slug}`,
    title: metadata.title,
    content,
    excerpt: metadata.excerpt,
    publishedAt,
    updatedAt,
    tags: metadata.tags,
    author: metadata.author,
    slug,
    coverImage: metadata.coverImage,
    imageAlt: metadata.imageAlt
  };
}
