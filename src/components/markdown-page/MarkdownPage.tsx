import React from 'react';
import Link from 'next/link';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { rewriteMarkdownHref } from '../../domain/markdown-href';

interface MarkdownPageProps {
  content: string;
}

const markdownComponents: Components = {
  a({ node: _node, href = '', children, ...props }) {
    const rewrittenHref = rewriteMarkdownHref(href);
    const isExternalUrl = /^https?:\/\//i.test(rewrittenHref);

    if (/^(mailto:|tel:)/i.test(rewrittenHref) || isExternalUrl) {
      return (
        <a
          href={rewrittenHref}
          target={isExternalUrl ? '_blank' : undefined}
          rel={isExternalUrl ? 'noreferrer noopener' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={rewrittenHref} {...props}>
        {children}
      </Link>
    );
  }
};

export function MarkdownPage({ content }: MarkdownPageProps) {
  return (
    <section className="markdown-page">
      <div className="markdown-shell">
        <article className="markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </section>
  );
}
