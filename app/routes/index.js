import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import App from 'containers/App';
import Intro from 'containers/Intro';
import Questions from 'containers/Questions';

export default function(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="questions" component={Questions} />
        <IndexRoute component={Intro} />
      </Route>
    </Router>
  );
};
