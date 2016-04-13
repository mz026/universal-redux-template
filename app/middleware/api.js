import superAgent from 'superagent';
import Promise from 'bluebird';
import _ from 'lodash';
import config from 'config';

export const CALL_API = Symbol('CALL_API');

export default store => next => action => {
  if (!action[CALL_API]) {
    return next(action);
  }

  let request = action[CALL_API];
  let { getState } = store;
  let { method, path, successType, errorType, afterSuccess, afterError } = request;
  let url = `${config.API_BASE_URL}${path}`

  return new Promise((resolve, reject) => {
    superAgent[method](url)
      .end((err, res) => {
        if (err) {
          if (errorType) {
            next({
              type: errorType,
              error: err,
            })
          }

          if (_.isFunction(afterError)) {
            afterError({ getState });
          }
          reject();
        } else {
          next({
            type: successType,
            response: res.body
          });

          if (_.isFunction(afterSuccess)) {
            afterSuccess({ getState });
          }
          resolve();
        }
      });
  });
};
