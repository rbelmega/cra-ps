import React from 'react';
import { Route } from 'react-router-dom';
import { history } from './redux/configureStore';
import { ConnectedRouter } from 'react-router-redux';
import App from './App';
import Blog from './components/blog/Blog';

export default () => (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/blog/:id" component={Blog} />
    </div>
  </ConnectedRouter>
);
