import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from 'store/configureStore';

import App from 'containers/App';
import Intro from 'containers/Intro';
import Question from 'containers/Question';

export default function(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/q/:questionId/:questionTitle" component={Question} />
        <IndexRoute component={Intro} />
      </Route>
    </Router>
  );
};
