import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { loadNewsArticles } from '../../../lib/news/server';
import { renderMarkdown } from '../../../lib/news/markdown';
import Nav from '../../components/Nav';

type Props = { params: Promise<{ slug: string }> };

// 静的エクスポート時は動的パラメータを無効化
export const dynamicParams = false;

async function listSlugsFromContent(): Promise<string[]> {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'news');
    const files = await fs.readdir(contentDir);
    return files
      .filter((f) => f.endsWith('.md'))
      .map((f) => path.basename(f, '.md'));
  } catch {
    return [];
  }
}

async function listSlugsFromJson(): Promise<string[]> {
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'data', 'news.json');
    const json = await fs.readFile(jsonPath, 'utf-8');
    const arr = JSON.parse(json) as Array<{ slug: string }>; 
    return arr.map((a) => a.slug);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const [fromContent, fromJson] = await Promise.all([
    listSlugsFromContent(),
    listSlugsFromJson(),
  ]);
  const uniq = Array.from(new Set([...
    fromContent,
    ...fromJson,
  ]));
  return uniq.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const articles = await loadNewsArticles();
  const article = articles.find(a => a.slug === params.slug);
  if (!article) return {};

  const url = `https://democracy-x.example.com/news/${article.slug}`;
  const image = article.coverImage || '/images/ogp-default.png';

  return {
    title: `${article.title} - Democracy-X`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} - Democracy-X`,
      description: article.excerpt,
      url,
      type: 'article',
      images: [{ url: image, width: 1200, height: 630 }],
      siteName: 'Democracy-X',
      locale: 'ja_JP',
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt?.toISOString(),
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@democracy_x',
    },
  };
}

export default async function NewsDetailPage(props: Props) {
  const params = await props.params;
  const articles = await loadNewsArticles();
  const article = articles.find(a => a.slug === params.slug);
  if (!article) return notFound();

  const htmlContent = await renderMarkdown(article.content);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-light)' }}>
      <Nav />
      <article className="max-w-4xl mx-auto px-6 py-16 pt-24" style={{ color: 'var(--text-dark)' }}>
      {/* カバー画像 */}
      {article.coverImage && (
        <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-lg mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.coverImage} alt={article.imageAlt || article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">{article.title}</h1>
          </div>
        </div>
      )}

      {!article.coverImage && (
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
      )}

      <div className="flex items-center justify-between mb-4 text-gray-600">
        <span>by {article.author}</span>
        <div className="flex gap-4 text-sm">
          <span>公開: {article.publishedAt.toLocaleDateString('ja-JP')}</span>
          {article.updatedAt && <span>更新: {article.updatedAt.toLocaleDateString('ja-JP')}</span>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {article.tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">#{tag}</span>
        ))}
      </div>

      <div className="article-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
    </div>
  );
}


