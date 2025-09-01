import { NewsArticle } from './types';
import { renderMarkdown } from './markdown';

// 静的エクスポート用のニュースサービス
export class StaticNewsService {
  private articles: NewsArticle[] = [];
  private loaded = false;

  async loadArticles(): Promise<void> {
    if (this.loaded) return;

    try {
      const response = await fetch('/data/news.json');
      if (response.ok) {
        const data = await response.json();
        this.articles = data.map((article: Record<string, unknown>) => ({
          ...article,
          publishedAt: new Date(article.publishedAt as string),
          updatedAt: article.updatedAt ? new Date(article.updatedAt as string) : undefined,
        } as NewsArticle));
      }
      this.loaded = true;
    } catch (error) {
      console.error('Failed to load static news data:', error);
      this.articles = [];
      this.loaded = true;
    }
  }

  async getAllArticles(): Promise<NewsArticle[]> {
    await this.loadArticles();
    return this.articles;
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
      return await renderMarkdown(article.content);
    } catch (error) {
      console.error('Failed to render content:', error);
      return '<p>コンテンツの読み込みに失敗しました。</p>';
    }
  }
}

// シングルトンインスタンス
export const staticNewsService = new StaticNewsService();
