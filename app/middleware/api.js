import superAgent from 'superagent';
import Promise, { using } from 'bluebird';
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
  let { method, path, successType, errorType, afterSuccess, afterError } = request;
  let url = `${config.API_BASE_URL}${path}`

  superAgent[method](url)
    .end((err, res)=> {
      if (err) {
        if ( errorType ) {
          next({
            type: errorType,
            error: err
          })
        }

        if (_.isFunction(afterError)) {
          afterError({ getState });
        }
      } else {
        next({
          type: successType,
          response: res.body
        });

        if (_.isFunction(afterSuccess)) {
          afterSuccess({ getState });
        }
      }
      deferred.resolve();
    });

  return deferred.promise;
};

function extractParams (callApi) {
  let { method, path, successType, errorType, afterSuccess, afterError } = callApi;
  let url = `${config.API_BASE_URL}${path}`

  return {
    method,
    url,
    successType,
    errorType,
    afterSuccess,
    afterError
  }
}

export const CHAIN_API = Symbol('CHAIN_API')
let apiChain = ({ dispatch, getState }) => next => action => {
  let deferred = Promise.defer()

  if (! action[CHAIN_API]) {
    return next(action)
  }

  let promiseCreators = action[CHAIN_API].map((apiActionCreator)=> {
    return createRequestPromise(apiActionCreator, next, getState, dispatch)
  })

  let overall = promiseCreators.reduce((promise, creator)=> {
    return promise.then((body)=> {
      return creator(body)
    })
  }, Promise.resolve())

  overall.finally(()=> {
    deferred.resolve()
  }).catch(()=> {})

  return deferred.promise
}

function createRequestPromise (apiActionCreator, next, getState, dispatch) {
  return (prevBody)=> {
    let apiAction = apiActionCreator(prevBody)
    let deferred = Promise.defer()
    let params = extractParams(apiAction[CALL_API])

    superAgent[params.method](params.url)
      .end((err, res)=> {
        if (err) {
          if ( params.errorType ) {
            dispatch({
              type: params.errorType,
              error: err
            })
          }

          if (_.isFunction(params.afterError)) {
            params.afterError({ getState });
          }
          deferred.reject();
        } else {
          dispatch({
            type: params.successType,
            response: res.body
          });

          if (_.isFunction(params.afterSuccess)) {
            params.afterSuccess({ getState });
          }
          deferred.resolve(res.body);
        }
      });

    return deferred.promise
  }

}

export { apiChain }
