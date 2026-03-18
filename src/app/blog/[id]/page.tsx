import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPosts } from '../../../domain/blog';
import { loadPublicText } from '../../../domain/public-content';

type Params = Promise<{ id: string }>;

export default async function Blog({ params }: { params: Params }) {
  const { id } = await params;

  // Get post metadata
  const posts = await getPosts();
  const currentIndex = posts.findIndex(p => p.id === id);
  const post = posts[currentIndex];
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  const markdownFile = await loadPublicText(`posts/post-${id}.md`);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const months: { [key: string]: string } = {
      'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April',
      'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August',
      'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
    };
    const parts = dateStr.split(' ');
    if (parts.length === 3) {
      return `Posted on ${months[parts[1]] || parts[1]} ${parts[0]}, ${parts[2]}`;
    }
    return `Posted on ${dateStr}`;
  };

  return (
    <section>
      <Link href="/">
        <h2 className="dev-name">
          <span className="post">Rostyslav Belmeha</span>
        </h2>
      </Link>
      <header>{post?.name || 'Blog Post'}</header>
      {nextPost ? (
        <Link href={`/blog/${nextPost.id}`} className="fake-post" />
      ) : (
        <section className="fake-post" />
      )}
      <section className="blog-wrapper">
        {post?.date && <p className="post-date">{formatDate(post.date)}</p>}
        <article>
          <ReactMarkdown
            children={markdownFile}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : 'javascript';

                if (inline) {
                  return <code {...props}>{children}</code>;
                }

                return (
                  <SyntaxHighlighter
                    style={dracula}
                    language={language}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
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
