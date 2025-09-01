import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { NewsArticle } from '../../lib/news/types';
import Nav from '../components/Nav';

export const metadata = {
  title: 'News - Democracy-X',
  description: 'Democracy-Xのニュース一覧',
  openGraph: {
    title: 'News - Democracy-X',
    description: 'Democracy-Xのニュース一覧',
    url: 'https://democracy-x.example.com/news',
    type: 'website',
    images: [
      {
        url: '/images/ogp-default.png',
        width: 1200,
        height: 630,
      },
    ],
    siteName: 'Democracy-X',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@democracy_x',
  },
};

interface RawNewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  author: string;
  slug: string;
  coverImage?: string;
  imageAlt?: string;
}

async function readNewsIndex(): Promise<RawNewsArticle[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'news.json');
    const json = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(json) as RawNewsArticle[];
  } catch {
    return [];
  }
}

export default async function NewsListPage() {
  const raw = await readNewsIndex();
  const articles: NewsArticle[] = raw.map((a: RawNewsArticle) => ({
    ...a,
    publishedAt: new Date(a.publishedAt),
    updatedAt: a.updatedAt ? new Date(a.updatedAt) : undefined,
  }));

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-light)', color: 'var(--text-dark)' }}>
      <Nav />
      <section className="px-6 py-16 pt-24">
        <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4 text-black font-bold">News</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">最新の記事一覧</p>
        </div>

        {articles.length === 0 ? (
          <div className="card-neo-light max-w-lg mx-auto text-gray-600 text-center space-y-4">
            <p>Coming Soon…</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {articles.map((article) => (
              <li key={article.id} className="card-neo-light">
                <Link href={`/news/${article.slug}`} className="block">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{article.title}</h2>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>by {article.author}</span>
                    <time>{article.publishedAt.toLocaleDateString('ja-JP')}</time>
                  </div>
                  <p className="text-gray-600">{article.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        </div>
      </section>
    </div>
  );
}


