'use client';

import { NewsArticle } from '../../lib/news/types';

interface NewsCardProps {
  article: NewsArticle;
  onClick?: () => void;
}

export function NewsCard({ article, onClick }: NewsCardProps) {
  return (
    <article 
      className="card-neo-light overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      {/* カバー画像 */}
      {article.coverImage && (
        <div className="relative h-48 w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImage}
            alt={article.imageAlt || article.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {article.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>by {article.author}</span>
          <time>
            {article.publishedAt.toLocaleDateString('ja-JP')}
          </time>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
