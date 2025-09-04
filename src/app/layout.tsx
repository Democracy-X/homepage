import './globals.css';
import type { ReactNode } from 'react';
import GoogleAnalytics from './components/GoogleAnalytics';

export const metadata = {
  title: 'Democracy-X - デジタル民主主義プラットフォーム',
  description: 'デジタル技術で民主主義の新しい形を探求するプラットフォーム。透明性、参加性、包摂性を重視し、より良い社会の実現を目指します。',
  metadataBase: new URL('https://democracy-x.org'),
  openGraph: {
    title: 'Democracy-X - デジタル民主主義プラットフォーム',
    description: 'デジタル技術で民主主義の新しい形を探求するプラットフォーム。透明性、参加性、包摂性を重視し、より良い社会の実現を目指します。',
    url: 'https://democracy-x.org/',
    siteName: 'Democracy-X',
    images: [
      {
        url: '/images/ogp-default.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@democracy_x',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
