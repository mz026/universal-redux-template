import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import configureStore from 'store/configureStore';
import createRoutes from 'routes/index';
import { Provider } from 'react-redux';

const history = createBrowserHistory();
const store = configureStore();


ReactDOM.render((
  <Provider store={store}>
    { createRoutes(history) }
  </Provider>
), document.getElementById('root'));
