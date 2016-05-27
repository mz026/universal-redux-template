import nock from 'nock'
import createApiMiddleware, { CALL_API, CHAIN_API } from 'middleware/api'
import superagent from 'superagent'
import { camelizeKeys } from 'humps'

describe('Middleware::Api', ()=> {
  let apiMiddleware
  let dispatch, getState, next
  let action
  const BASE_URL = 'http://localhost:3000'

  beforeEach(()=> {
    apiMiddleware = createApiMiddleware({ baseUrl: BASE_URL })
    dispatch = sinon.stub()
    getState = sinon.stub()
    next = sinon.stub()
  })

  describe('when called with [CHAIN_API]', ()=> {
    let successType1 = 'ON_SUCCESS_1'
    let successType2 = 'ON_SUCCESS_2'
    let errorType2 = 'ON_ERROR_2'

    let nockScope1, nockScope2

    let afterSuccess1, afterSuccess2
    let response1 = { id: 'the-id-1', to_be_camelized: 'snake-val' }
    let response2 = { id: 'the-res-2' }
    let path1 = '/the-url/path-1'
    let path2 = `/the-url/${response1.id}`

    let afterError2
    let afterError

    beforeEach(()=> {
      afterSuccess1 = sinon.stub()
      afterSuccess2 = sinon.stub()
      afterError2 = sinon.stub()
      action = {
        [CHAIN_API]: [
          ()=> {
            return {
              extra1: 'val1',
              [CALL_API]: {
                method: 'post',
                body: { bodyKey: 'body-val' },
                query: { queryKey: 'query-val' },
                path: path1,
                afterSuccess: afterSuccess1,
                successType: successType1
              }
            }
          },
          (resBody1)=> {
            return {
              extra2: 'val2',
              [CALL_API]: {
                method: 'get',
                path: path2,
                afterSuccess: afterSuccess2,
                afterError: afterError2,
                successType: successType2,
                errorType: errorType2
              }
            }
          }
        ]
      }
    })

    function nockRequest1 () {
      return nock(BASE_URL).post(path1)
                                      .query({ queryKey: 'query-val' })
                                      .reply(200, response1)
    }
    function nockRequest2 (status = 200) {
      return nock(BASE_URL).get('/the-url/the-id-1')
                                      .reply(status, response2)
    }

    afterEach(()=> {
      nock.cleanAll()
    })
    describe('when all API calls are success', ()=> {
      beforeEach(()=> {
        nockScope1 = nockRequest1()
        nockScope2 = nockRequest2()
      })

      it('sends requests to all endpoints', (done)=> {
        let promise = apiMiddleware({ dispatch, getState })(next)(action)

        promise.then(()=> {
          nockScope1.done()
          nockScope2.done()
          done()
        })
      })
      it('trigger afterSuccess for all endpoints', (done)=> {
        let promise = apiMiddleware({ dispatch, getState })(next)(action)
        promise.then(()=> {
          expect(afterSuccess1).to.have.been.calledWith({ getState })
          expect(afterSuccess2).to.have.been.calledWith({ getState })
          done()
        })
      })
      it('dispatch successType for all endpoints', (done)=> {
        let promise = apiMiddleware({ dispatch, getState })(next)(action)
        promise.then(()=> {
          expect(dispatch).to.have.been
            .calledWith({ type: successType1, response: camelizeKeys(response1), extra1: 'val1' })
          expect(dispatch).to.have.been
            .calledWith({ type: successType2, response: camelizeKeys(response2), extra2: 'val2' })
          done()
        })
      })
    })

    describe('when one of the apis failed', ()=> {
      beforeEach(()=> {
        nockScope1 = nockRequest1()
        nockScope2 = nockRequest2(400)
      })
      it("sends request until it's failed", (done)=> {
        let promise = apiMiddleware({ getState, dispatch })(next)(action)
        promise.then(()=> {
          nockScope1.done()
          nockScope2.done()
          done()
        })
      })
      it('triggers afterSuccess and dispatches success for the ok ones', (done)=> {
        let promise = apiMiddleware({ dispatch, getState })(next)(action)
        promise.then(()=> {
          expect(dispatch).to.have.been.calledWith({
            extra1: 'val1',
            type: successType1,
            response: camelizeKeys(response1)
          })
          expect(afterSuccess1).to.have.been.calledWith({ getState })
          done()
        })
      })
      it('trigger afterError of path2', (done)=> {
        let promise = apiMiddleware({ dispatch, getState })(next)(action)
        promise.then(()=> {
          expect(afterError2).to.have.been.calledWith({ getState })
          done()
        })
      })
      it('dispatches errorType of path2', (done)=> {
        let dispatchedAction
        dispatch = function(a) {
          dispatchedAction = a
        }
        let promise = apiMiddleware({ dispatch, getState })(next)(action)
        promise.then(()=> {
          expect(dispatchedAction.type).to.equal(errorType2)
          expect(dispatchedAction.error).to.be.an.instanceOf(Error)
          done()
        })
      })

      describe('errorInterceptor behaviors', ()=> {
        it('handles dispatch and rejection stuff via `handleError`', (done)=> {
          let spy = sinon.spy()
          let dispatchedAction
          dispatch = function(a) {
            dispatchedAction = a
          }
          apiMiddleware = createApiMiddleware({
            baseUrl: BASE_URL,
            errorInterceptor: ({ handleError, err, replay, getState })=> {
              spy()
              expect(getState).to.equal(getState)
              handleError(err)
            }
          })
          apiMiddleware({ dispatch, getState })(next)(action)
            .then(()=> {
              expect(spy).to.have.been.called
              expect(dispatchedAction.type).to.equal(errorType2)
              expect(dispatchedAction.error).to.be.an.instanceOf(Error)
              done()
            })
        })

        describe('replay', ()=> {
          beforeEach(()=> sinon.spy(superagent, 'get'))
          afterEach(()=> superagent.get.restore())

          it('resend the request', (done)=> {
            let errTime = 0
            apiMiddleware = createApiMiddleware({
              baseUrl: BASE_URL,
              errorInterceptor: ({ handleError, err, replay, getState })=> {
                if (errTime == 1) {
                  handleError(err)
                } else {
                  replay()
                  errTime ++
                }
              }
            })
            apiMiddleware({ dispatch, getState })(next)(action)
              .then(()=> {
                expect(superagent.get).to.have.been
                  .calledWith(`${BASE_URL}${path2}`).twice
                done()
              })
          })
        })
      })

    })
  })


  describe('when action is without CALL_API and CHAIN_API', ()=> {
    it('passes the action to next middleware', ()=> {
      action = { type: 'not-CALL_API' }
      apiMiddleware({ dispatch, getState })(next)(action)
      expect(next).to.have.been.calledWith(action)
    })
  })

  describe('when action is with `CALL_API`', ()=> {
    let successType = 'ON_SUCCESS'
    let path = '/the-url/path'
    let dispatchedAction

    beforeEach(()=> {
      dispatch = function(a) {
        dispatchedAction = a
      }
      action = {
        [CALL_API]: {
          method: 'get',
          path,
          successType
        }
      }
    })
    it('forwards it to CHAIN_API as a special case', ()=> {
      apiMiddleware({ dispatch, getState })(next)(action)
      expect(dispatchedAction[CHAIN_API].length).to.equal(1)
      expect(dispatchedAction[CHAIN_API][0]()).to.equal(action)
    })
  })
})
