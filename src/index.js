import 'react-app-polyfill/ie11'; // For IE 11 support
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import configureStore from './redux/configureStore';
import './index.css';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
