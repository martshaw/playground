import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import HomePage from './js/containers/HomePage';
import store from './js/stores';

import './index.html';

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.getElementById('app')
);