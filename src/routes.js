import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import App from './components/main/App';
import Blog from './components/blog/Blog';

export default ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/blog/:id" component={Blog} />
    </div>
  </ConnectedRouter>
);
