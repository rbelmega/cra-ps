import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'isomorphic-fetch';
import fetch from 'isomorphic-fetch';

class PrivacyPolicy extends React.Component {
  state = {
    data: null,
  };

  componentDidMount() {
    console.log('hello');
    fetch(`/api/privacy_policy.md`)
      .then(response => response.text())
      .then(data => this.setState({ data }));
  }

  render() {
    return (
      <section className="privacy-policy">
        <ReactMarkdown
          source={this.state.data || ''}
          renderers={Object.assign({}, ReactMarkdown.renderers)}
        />
      </section>
    );
  }
}

export default PrivacyPolicy;
