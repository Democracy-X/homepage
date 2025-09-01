'use client';

import { useState, useEffect } from 'react';
import { NewsArticle } from '../../lib/news/types';
import { staticNewsService } from '../../lib/news/staticService';

interface NewsDetailProps {
  article: NewsArticle;
  onBack?: () => void;
}

export function NewsDetail({ article, onBack }: NewsDetailProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const html = await staticNewsService.renderArticleContent(article);
        setHtmlContent(html);
      } catch (error) {
        console.error('Failed to render content:', error);
        setHtmlContent('<p>コンテンツの読み込みに失敗しました。</p>');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [article]);

  return (
    <article className="max-w-4xl mx-auto">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          ← 戻る
        </button>
      )}

      {/* カバー画像 */}
      {article.coverImage && (
        <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-lg mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImage}
            alt={article.imageAlt || article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
              {article.title}
            </h1>
          </div>
        </div>
      )}

      <header className="mb-8">
        {/* カバー画像がない場合のタイトル */}
        {!article.coverImage && (
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {article.title}
          </h1>
        )}
        
        <div className="flex items-center justify-between mb-4 text-gray-600">
          <span>by {article.author}</span>
          <div className="flex gap-4 text-sm">
            <span>公開: {article.publishedAt.toLocaleDateString('ja-JP')}</span>
            {article.updatedAt && (
              <span>更新: {article.updatedAt.toLocaleDateString('ja-JP')}</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">読み込み中...</p>
          </div>
        ) : (
          <div 
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="article-content"
          />
        )}
      </div>
    </article>
  );
}
