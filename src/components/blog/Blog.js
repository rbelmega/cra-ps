import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import 'isomorphic-fetch';

class Blog extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const {
      match: { params },
    } = this.props;
    fetch(`/api/posts/post-${params.id}.md`)
      .then(data => data.text())
      .then(data => {
        this.markdownFile = data;
        this.forceUpdate();
      });
  }

  render() {
    return (
      <section>
        <Link to="/">
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
              source={this.markdownFile || ''}
              renderers={Object.assign({}, ReactMarkdown.renderers, {
                code: CodeBlock,
              })}
            />
          </article>
        </section>
      </section>
    );
  }
}

export default Blog;
