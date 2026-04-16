import { getPostById, getPostHref } from './blog';

const BLOG_POST_PATTERN = /^posts\/post-(\d+)\.md$/i;
const INTERNAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', 'www.belmeha.com', 'belmeha.com']);

const normalizePath = (value: string) =>
  value
    .replace(/^(\.\.\/|\.\/)+/, '')
    .replace(/\\/g, '/')
    .replace(/^public\//, '')
    .replace(/^\/+/, '');

const toSlug = (value: string) => value.replace(/_/g, '-');

function getInternalMarkdownRoute(pathname: string): string | null {
  const normalizedPath = normalizePath(pathname);

  const blogMatch = BLOG_POST_PATTERN.exec(normalizedPath);
  if (blogMatch) {
    const post = getPostById(blogMatch[1]);
    return post ? getPostHref(post) : `/blog/${blogMatch[1]}`;
  }

  if (!normalizedPath.endsWith('.md')) {
    return null;
  }

  const fileName = normalizedPath.slice(0, -3);

  if (fileName === 'privacy_policy') {
    return '/privacy-policy';
  }

  if (fileName === 'support') {
    return '/support';
  }

  if (fileName.startsWith('privacy_policy_')) {
    return `/${toSlug(fileName.slice('privacy_policy_'.length))}/privacy-policy`;
  }

  if (fileName.startsWith('support_')) {
    return `/${toSlug(fileName.slice('support_'.length))}/support`;
  }

  return `/${toSlug(fileName)}`;
}

export function rewriteMarkdownHref(href: string): string {
  if (!href || href.startsWith('#')) {
    return href;
  }

  if (/^(mailto:|tel:)/i.test(href)) {
    return href;
  }

  const hasScheme = /^[a-z][a-z\d+.-]*:/i.test(href);

  if (hasScheme) {
    try {
      const url = new URL(href);
      if (!INTERNAL_HOSTNAMES.has(url.hostname)) {
        return href;
      }

      const rewrittenPath = getInternalMarkdownRoute(url.pathname);

      if (!rewrittenPath) {
        return href;
      }

      return `${url.origin}${rewrittenPath}${url.search}${url.hash}`;
    } catch {
      return href;
    }
  }

  const [pathWithQuery = '', hash = ''] = href.split('#', 2);
  const [pathname = '', search = ''] = pathWithQuery.split('?', 2);
  const rewrittenPath = getInternalMarkdownRoute(pathname);

  if (!rewrittenPath) {
    return href;
  }

  const querySuffix = search ? `?${search}` : '';
  const hashSuffix = hash ? `#${hash}` : '';

  return `${rewrittenPath}${querySuffix}${hashSuffix}`;
}
