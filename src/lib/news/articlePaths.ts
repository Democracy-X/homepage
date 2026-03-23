/** ニュース記事のコロケーション用パス解決（server と generateNewsData の両方で利用） */

export function resolveCoverImageUrl(
  coverImage: string | undefined,
  slug: string,
): string | undefined {
  if (coverImage == null || typeof coverImage !== 'string') return undefined;
  const trimmed = coverImage.trim();
  if (trimmed === '') return undefined;
  if (trimmed.startsWith('/')) return trimmed;
  const name = trimmed.replace(/^\.\//, '');
  return `/images/news/${slug}/${name}`;
}

/** 本文内の同一フォルダ参照 `](./file` を公開URLへ変換する */
export function rewriteMarkdownContentPaths(content: string, slug: string): string {
  return content.split('](./').join(`](/images/news/${slug}/`);
}
