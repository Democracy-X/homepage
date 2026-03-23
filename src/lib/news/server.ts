import { promises as fs } from 'fs';
import path from 'path';
import { NewsArticle, NewsMetadata } from './types';
import { parseMarkdown } from './markdown';
import { resolveCoverImageUrl, rewriteMarkdownContentPaths } from './articlePaths';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'news');

export async function loadNewsArticles(): Promise<NewsArticle[]> {
  try {
    try {
      await fs.access(CONTENT_DIR);
    } catch {
      return [];
    }

    const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
    const articles: NewsArticle[] = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const slug = entry.name;
      if (slug.startsWith('.')) continue;

      const filePath = path.join(CONTENT_DIR, slug, 'index.md');
      try {
        await fs.access(filePath);
      } catch {
        continue;
      }

      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { metadata, content: rawContent } = parseMarkdown(fileContent);
        const content = rewriteMarkdownContentPaths(rawContent, slug);
        const article = createArticle(slug, metadata, content);
        articles.push(article);
      } catch (error) {
        console.error(`Failed to process ${slug}:`, error);
      }
    }

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
    coverImage: resolveCoverImageUrl(metadata.coverImage, slug),
    imageAlt: metadata.imageAlt,
  };
}
