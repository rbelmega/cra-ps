import React from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';
import { history } from './redux/configureStore';

export const Root = ({ store }) => (
  <Provider store={store}>
    <Routes history={history} />
  </Provider>
);

export default Root;
