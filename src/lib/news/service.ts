import { NewsArticle } from './types';

// クライアントサイドニュースサービス（APIを通じてデータを取得）
export class NewsService {
  private baseUrl = '/api/news';

  async getAllArticles(): Promise<NewsArticle[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error('Failed to fetch articles');
      const articles = await response.json();
      return this.transformDates(articles);
    } catch (error) {
      console.error('Failed to get articles:', error);
      return [];
    }
  }

  async getRecentArticles(limit: number = 5): Promise<NewsArticle[]> {
    const articles = await this.getAllArticles();
    return articles.slice(0, limit);
  }

  async getArticleBySlug(slug: string): Promise<NewsArticle | null> {
    const articles = await this.getAllArticles();
    return articles.find(article => article.slug === slug) || null;
  }

  async getArticlesByTag(tag: string): Promise<NewsArticle[]> {
    const articles = await this.getAllArticles();
    return articles.filter(article => 
      article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  async getAvailableTags(): Promise<string[]> {
    const articles = await this.getAllArticles();
    const tagSet = new Set<string>();
    articles.forEach(article => {
      article.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }

  async renderArticleContent(article: NewsArticle): Promise<string> {
    try {
      const response = await fetch('/api/news/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: article.content }),
      });
      
      if (!response.ok) throw new Error('Failed to render content');
      
      const { html } = await response.json();
      return html;
    } catch (error) {
      console.error('Failed to render content:', error);
      return '<p>コンテンツの読み込みに失敗しました。</p>';
    }
  }

  private transformDates(articles: unknown[]): NewsArticle[] {
    return articles.map(article => {
      const art = article as Record<string, unknown>;
      return {
        ...art,
        publishedAt: new Date(art.publishedAt as string),
        updatedAt: art.updatedAt ? new Date(art.updatedAt as string) : undefined,
      } as NewsArticle;
    });
  }
}

// シングルトンインスタンス
export const newsService = new NewsService();
