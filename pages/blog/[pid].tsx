import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from '../../src/styles';

const Blog = () => {
  const [markdownFile, setMarkdownFile] = useState('');
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    pid && fetchData(pid);
  }, [pid]);

  const fetchData = (id) => {
    fetch(`/posts/post-${id}.md`)
      .then((data) => data.text())
      .then((data) => {
        setMarkdownFile(data);
      });
  };

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
              code({ node, inline, className, children, ...props }) {
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
};

export default Blog;
