import superAgent from 'superagent'
import Promise, { using } from 'bluebird'
import _ from 'lodash'
import config from 'config'
import { camelizeKeys } from 'humps'

export const CALL_API = Symbol('CALL_API')
export const CHAIN_API = Symbol('CHAIN_API')

export default ({ dispatch, getState }) => next => action => {
  if (action[CALL_API]) {
    return dispatch({
      [CHAIN_API]: [
        ()=> action
      ]
    })
  }

  let deferred = Promise.defer()

  if (! action[CHAIN_API]) {
    return next(action)
  }

  let promiseCreators = action[CHAIN_API].map((createCallApiAction)=> {
    return createRequestPromise(createCallApiAction, next, getState, dispatch)
  })

  let overall = promiseCreators.reduce((promise, createReqPromise)=> {
    return promise.then((body)=> {
      return createReqPromise(body)
    })
  }, Promise.resolve())

  overall.finally(()=> {
    deferred.resolve()
  }).catch(()=> {})

  return deferred.promise
}

function actionWith (action, toMerge) {
  let ac = _.cloneDeep(action)
  if (ac[CALL_API]) {
    ac[CALL_API].delete
  }
  return _.merge(ac, toMerge)
}

function createRequestPromise (createCallApiAction, next, getState, dispatch) {
  return (prevBody)=> {
    let apiAction = createCallApiAction(prevBody)
    let deferred = Promise.defer()
    let params = extractParams(apiAction[CALL_API])

    superAgent[params.method](params.url)
      .send(params.body)
      .query(params.query)
      .end((err, res)=> {
        if (err) {
          dispatchErrorType(err)
          processAfterError()
          deferred.reject()
        } else {
          let resBody = camelizeKeys(res.body)
          dispatchSuccessType(resBody)
          processAfterSuccess()
          deferred.resolve(resBody)
        }
      })
    return deferred.promise

    function dispatchErrorType (err) {
      if ( params.errorType ) {
        dispatch(actionWith(apiAction, {
          type: params.errorType,
          error: err
        }))
      }
    }
    function processAfterError () {
      if (_.isFunction(params.afterError)) {
        params.afterError({ getState })
      }
    }
    function dispatchSuccessType (resBody) {
      dispatch(actionWith(apiAction, {
        type: params.successType,
        response: resBody
      }))
    }
    function processAfterSuccess () {
      if (_.isFunction(params.afterSuccess)) {
        params.afterSuccess({ getState })
      }
    }
  }
}

function extractParams (callApi) {
  let {
    method,
    path,
    query,
    body,
    successType,
    errorType,
    afterSuccess,
    afterError
  } = callApi

  let url = `${config.API_BASE_URL}${path}`

  return {
    method,
    url,
    query,
    body,
    successType,
    errorType,
    afterSuccess,
    afterError
  }
}
