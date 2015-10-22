import Express from 'express';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import createLocation from 'history/lib/createLocation'
import { RoutingContext, match } from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory';
import Promise from 'bluebird';

import configureStore from 'store/configureStore';
import crateRoutes from 'routes/index';

import { Provider } from 'react-redux';

let server = new Express();
let port = 3000;

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

// mock apis
server.get('/questions', (req, res)=> {
  let { questions } = require('./mock_api');
  res.send(questions);
});

server.get('*', (req, res)=> {
  let history = createMemoryHistory();
  let store = configureStore();

  let routes = crateRoutes(history);

  let location = createLocation(req.url)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      res.send(500, error.message)
    } else if (renderProps == null) {
      res.send(404, 'Not found')
    } else {
      let { query, params } = renderProps;
      let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
      let promise = comp.fetchData ?
        comp.fetchData({ query, params, store }) :
        Promise.resolve();

      promise.then(()=> {
        let reduxState = escape(JSON.stringify(store.getState()));
        let html = ReactDOMServer.renderToString(
          <Provider store={store}>
            { <RoutingContext {...renderProps}/> }
          </Provider>
        );

        res.render('index', { html, reduxState });
      });
    }
  });
});

console.log(`Server is listening to port: ${port}`);
server.listen(port);
