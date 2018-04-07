import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import dataStore from '../reducers/index';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();

// Grab the state from a global injected into server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

const configureStore = () => {
  const middlewares = [thunk, createLogger(), routerMiddleware(history)];

  return createStore(
    dataStore,
    preloadedState,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
