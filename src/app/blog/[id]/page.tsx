import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPosts } from '../../../domain/blog';
import { readFile } from 'fs/promises';
import { join } from 'path';

type Params = Promise<{ id: string }>;

export default async function Blog({ params }: { params: Params }) {
  const { id } = await params;
  
  // Get post metadata
  const posts = await getPosts();
  const post = posts.find(p => p.id === id);
  
  // Fetch markdown content
  let markdownFile = '';
  try {
    // Try local file first
    if (process.env.NODE_ENV !== 'production' || process.env.USE_LOCAL_POSTS === 'true') {
      const filePath = join(process.cwd(), 'public', 'posts', `post-${id}.md`);
      markdownFile = await readFile(filePath, 'utf8');
    } else {
      // Fallback to remote
      const response = await fetch(`https://www.belmeha.com/posts/post-${id}.md`);
      markdownFile = await response.text();
    }
  } catch (error) {
    console.error('Error loading blog post:', error);
  }

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
      <section className="fake-post" />
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
