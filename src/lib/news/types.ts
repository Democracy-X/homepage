// ニュース記事の型定義
export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
  author: string;
  slug: string;
  coverImage?: string;
  imageAlt?: string;
}

// Markdownファイルのfrontmatter型
export interface NewsMetadata {
  title: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  author: string;
  excerpt: string;
  coverImage?: string;
  imageAlt?: string;
}
