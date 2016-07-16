import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import apiMiddleware from 'redux-api-middleman'

import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import config from 'config'


const logger = createLogger({
  level: 'info',
  collapsed: false,
  logger: console,
  predicate: (getState, action) => true
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  apiMiddleware({baseUrl: config.API_BASE_URL}),
  logger
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
