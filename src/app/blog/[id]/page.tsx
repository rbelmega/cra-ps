import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Params = Promise<{ id: string }>;

export default async function Blog({ params }: { params: Params }) {
  const { id } = await params;
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
              code({ children }) {
                return (
                  <SyntaxHighlighter style={dracula} language="javascript">
                    {children.toString()}
                  </SyntaxHighlighter>
                );
              }
            }}
          />
        </article>
      </section>
    </section>
  );
}
