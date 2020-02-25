import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import App from './components/main/App';
import Blog from './components/blog/Blog';
import PrivacyPolicy from './components/privacy-policy/PrivacyPolicy';

export default ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/blog/:id" component={Blog} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
    </div>
  </ConnectedRouter>
);
