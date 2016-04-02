import superAgent from 'superagent';
import Promise from 'bluebird';
import _ from 'lodash';
import config from 'config';

export const CALL_API = Symbol('CALL_API');

export default store => next => action => {
  if ( ! action[CALL_API] ) {
    return next(action);
  }
  let request = action[CALL_API];
  let { getState } = store;
  let deferred = Promise.defer();
  let { method, path, successType } = request;
  let url = `${config.API_BASE_URL}${path}`

  superAgent[method](url)
    .end((err, res)=> {
      if ( !err ) {
        next({
          type: successType,
          response: res.body
        });

        if (_.isFunction(request.afterSuccess)) {
          request.afterSuccess({ getState });
        }

      }
      deferred.resolve();
    });

  return deferred.promise;
};
