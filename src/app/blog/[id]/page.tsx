'use client';

import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from '../../../styles';

export default async function Blog({ params }) {
  const { id } = params;

  const response = await fetch(`https://www.belmeha.com/posts/post-${id}.md`);
  const markdownFile = await response.text();

  return (
    <section>
      <Link href="/">
        <h2 className="dev-name">
          <span className="post">Rostyslav Belmeha</span>
        </h2>
      </Link>
      <header>should you be an engineer (part 1)?</header>
      <section className="fake-post" />
      <section className="blog-wrapper">
        <p className="post-date">Posted on Mar 1, 2016</p>
        <article>
          <ReactMarkdown
            children={markdownFile}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, className, children, ...props }) {
                return (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={dark}
                    language="javascript"
                    PreTag="div"
                    {...props}
                  />
                );
              },
            }}
          />
        </article>
      </section>
    </section>
  );
}
