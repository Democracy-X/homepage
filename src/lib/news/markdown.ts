import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { NewsMetadata } from './types';

// Markdownパーサー
const markdownProcessor = remark()
  .use(remarkGfm)
  .use(remarkHtml, { 
    sanitize: false,
    allowDangerousHtml: true
  });

export function parseMarkdown(content: string): {
  metadata: NewsMetadata;
  content: string;
} {
  const { data, content: markdownContent } = matter(content);
  
  if (!validateMetadata(data)) {
    throw new Error('Invalid frontmatter metadata');
  }

  return {
    metadata: data as NewsMetadata,
    content: markdownContent
  };
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await markdownProcessor.process(content);
  return result.toString();
}

function validateMetadata(data: unknown): data is NewsMetadata {
  return !!(
    data &&
    typeof data === 'object' &&
    'title' in data &&
    'publishedAt' in data &&
    'author' in data &&
    'excerpt' in data &&
    'tags' in data &&
    typeof (data as Record<string, unknown>).title === 'string' &&
    typeof (data as Record<string, unknown>).publishedAt === 'string' &&
    typeof (data as Record<string, unknown>).author === 'string' &&
    typeof (data as Record<string, unknown>).excerpt === 'string' &&
    Array.isArray((data as Record<string, unknown>).tags)
    // coverImage と imageAlt はオプショナルなので検証しない
  );
}
