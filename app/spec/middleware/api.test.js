import nock from 'nock'
import apiMiddleware, { CALL_API, CHAIN_API } from 'middleware/api'
import config from 'config'
import superagent from 'superagent'
import { camelizeKeys } from 'humps'

describe('Middleware::Api', function(){
  let store, next
  let action
  beforeEach(function(){
    store = { dispatch: sinon.stub(), getState: sinon.stub() }
    next = sinon.stub()
  })

  describe('when called with [CHAIN_API]', function(){
    let path1 = '/the-url/path-1'
    let successType1 = 'ON_SUCCESS_1'
    let successType2 = 'ON_SUCCESS_2'
    let errorType2 = 'ON_ERROR_2'

    let nockScope1, nockScope2

    let afterSuccess1, afterSuccess2
    let response1 = { id: 'the-id-1', to_be_camelized: 'snake-val' }
    let response2 = { id: 'the-res-2' }

    let afterError2
    let afterError

    beforeEach(function(){
      store = {
        dispatch: sinon.spy(),
        getState: sinon.spy()
      }
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
                path: `/the-url/${resBody1.id}`,
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
      return nock(config.API_BASE_URL).post(path1)
                                      .query({ queryKey: 'query-val' })
                                      .reply(200, response1)
    }
    function nockRequest2 (status = 200) {
      return nock(config.API_BASE_URL).get('/the-url/the-id-1')
                                      .reply(status, response2)
    }

    afterEach(function(){
      nock.cleanAll()
    })
    describe('when all API calls are success', function(){
      beforeEach(function(){
        nockScope1 = nockRequest1()
        nockScope2 = nockRequest2()
      })

      it('sends requests to all endpoints', function(done){
        let promise = apiMiddleware(store)(next)(action)

        promise.then(()=> {
          nockScope1.done()
          nockScope2.done()
          done()
        })
      })
      it('trigger afterSuccess for all endpoints', function(done){
        let promise = apiMiddleware(store)(next)(action)
        promise.then(()=> {
          expect(afterSuccess1).to.have.been.calledWith({ getState: store.getState})
          expect(afterSuccess2).to.have.been.calledWith({ getState: store.getState})
          done()
        })
      })
      it('dispatch successType for all endpoints', function(done){
        let promise = apiMiddleware(store)(next)(action)
        promise.then(()=> {
          expect(store.dispatch).to.have.been
            .calledWith({ type: successType1, response: camelizeKeys(response1), extra1: 'val1' })
          expect(store.dispatch).to.have.been
            .calledWith({ type: successType2, response: camelizeKeys(response2), extra2: 'val2' })
          done()
        })
      })
    })

    describe('when one of the apis failed', function(){
      beforeEach(function(){
        nockScope1 = nockRequest1()
        nockScope2 = nockRequest2(400)
      })
      it("sends request until it's failed", function(done){
        let promise = apiMiddleware(store)(next)(action)
        promise.then(()=> {
          nockScope1.done()
          nockScope2.done()
          done()
        })
      })
      it('triggers afterSuccess and dispatches success for the ok ones', function(done){
        let promise = apiMiddleware(store)(next)(action)
        promise.then(()=> {
          expect(store.dispatch).to.have.been.calledWith({
            extra1: 'val1',
            type: successType1,
            response: camelizeKeys(response1)
          })
          expect(afterSuccess1).to.have.been.calledWith({ getState: store.getState })
          done()
        })
      })
      it('trigger afterError of path2', function(done){
        let promise = apiMiddleware(store)(next)(action)
        promise.then(()=> {
          expect(afterError2).to.have.been.calledWith({ getState: store.getState})
          done()
        })
      })
      it('dispatches errorType of path2', function(done){
        let dispatchedAction
        store.dispatch = function(a) {
          dispatchedAction = a
        }
        let promise = apiMiddleware(store)(next)(action)
        promise.then(()=> {
          expect(dispatchedAction.type).to.equal(errorType2)
          expect(dispatchedAction.error).to.be.an.instanceOf(Error)
          done()
        })
      })
    })
  })


  describe('when action is without CALL_API and CHAIN_API', function(){
    it('passes the action to next middleware', function(){
      action = { type: 'not-CALL_API' }
      apiMiddleware(store)(next)(action)
      expect(next).to.have.been.calledWith(action)
    })
  })

  describe('when action is with `CALL_API`', function(){
    let successType = 'ON_SUCCESS'
    let path = '/the-url/path'
    let dispatchedAction

    beforeEach(function(){
      store.dispatch = function(a) {
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
    it('forwards it to CHAIN_API as a special case', function(){
      apiMiddleware(store)(next)(action)
      expect(dispatchedAction[CHAIN_API].length).to.equal(1)
      expect(dispatchedAction[CHAIN_API][0]()).to.equal(action)
    })
  })
})
