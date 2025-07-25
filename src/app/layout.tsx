import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Democracy-X - デジタル民主主義プラットフォーム',
  description: 'デジタル技術で民主主義の新しい形を探求するプラットフォーム。透明性、参加性、包摂性を重視し、より良い社会の実現を目指します。',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
