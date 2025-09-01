'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NewsArticle } from '../../lib/news/types';
import { staticNewsService } from '../../lib/news/staticService';
import { NewsCard } from './NewsCard';

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const recentArticles = await staticNewsService.getRecentArticles(6);
      setArticles(recentArticles);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ホームでは詳細展開せず一覧カードのみ表示

  return (
    <section id="news" className="min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-black font-bold">News</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Democracy-Xの最新情報やアップデート、技術的な話題をお届けします
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">記事を読み込み中...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="card-neo-light max-w-lg mx-auto text-gray-600 text-center space-y-4">
            <p>Coming Soon…</p>
            <p className="text-sm text-gray-500">
              Democracy-Xの最新情報やアップデートをお待ちください
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link key={article.id} href={`/news/${article.slug}`}>
                  <NewsCard article={article} />
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/news"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                もっと見る
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
} 