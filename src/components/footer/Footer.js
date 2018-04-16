import React from 'react';
import BlogList from '../blog-list/BlogList';

class Footer extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let self = this;
    const { fetchPosts } = this.props;
    fetchPosts();

    fetch('/api2/instagram')
      .then(data => data.json())
      .then(data => {
        self.data = data.data;
        self.forceUpdate();
      });
  }

  render() {
    return (
      <div style={{}}>
        <div
          className="instagram-wrapper"
          style={{
            whiteSpace: 'nowrap',
            overflowY: 'auto',
          }}
        >
          {this.data &&
            this.data.map(img => (
              <a key={img.link} href={img.link} target="_blank">
                <img src={img.images.thumbnail.url} />
              </a>
            ))}
        </div>
        <div
          style={{
            padding: 30,
          }}
        >
          <BlogList posts={this.props.posts} />
        </div>
      </div>
    );
  }
}

export default Footer;
