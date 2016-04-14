import nock from 'nock';
import apiMiddleware, { CALL_API, CHAIN_API, apiChain } from 'middleware/api';
import config from 'config';

import superagent from 'superagent'

describe('Middleware::Api', function(){
  let store, next;
  let action;
  let successType = 'ON_SUCCESS';
  let path = '/the-url/path';

  beforeEach(function(){
    store = {
    };
    next = sinon.stub();
    action = {
      [CALL_API]: {
        method: 'get',
        path,
        successType
      }
    };
  });

  describe.only('`apiChain` middleware', function(){
    let path1 = '/the-url/path-1'
    let successType1 = 'ON_SUCCESS_1'
    let successType2 = 'ON_SUCCESS_2'
    let errorType2 = 'ON_ERROR_2'

    let nockScope1, nockScope2

    let afterSuccess1, afterSuccess2
    let response1 = { id: 'the-id-1' }
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
                method: 'get',
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

    afterEach(function(){
      nock.cleanAll();
    })
    describe('when all API calls are success', function(){
      beforeEach(function(){
        nockScope1 = nock(config.API_BASE_URL).get(path1).reply(200, response1)
        nockScope2 = nock(config.API_BASE_URL).get('/the-url/the-id-1')
                                              .reply(200, response2)
      })

      it('sends requests to all endpoints', function(done){
        let promise = apiChain(store)(next)(action)

        promise.then(()=> {
          nockScope1.done()
          nockScope2.done()
          done()
        })
      })
      it('trigger afterSuccess for all endpoints', function(done){
        let promise = apiChain(store)(next)(action)
        promise.then(()=> {
          expect(afterSuccess1).to.have.been.calledWith({ getState: store.getState})
          expect(afterSuccess2).to.have.been.calledWith({ getState: store.getState})
          done()
        })
      })
      it('dispatch successType for all endpoints', function(done){
        let promise = apiChain(store)(next)(action)
        promise.then(()=> {
          expect(store.dispatch).to.have.been
            .calledWith({ type: successType1, response: response1 })
          expect(store.dispatch).to.have.been
            .calledWith({ type: successType2, response: response2 })
          done()
        })
      })
    })

    describe('when one of the apis failed', function(){
      beforeEach(function(){
        nockScope1 = nock(config.API_BASE_URL).get(path1).reply(200, { id: 'the-id-1' })
        nockScope2 = nock(config.API_BASE_URL).get('/the-url/the-id-1')
                                              .reply(400, { id: 'the-res-2' })
      })
      it("sends request until it's failed", function(done){
        let promise = apiChain(store)(next)(action)
        promise.then(()=> {
          nockScope1.done()
          nockScope2.done()
          done()
        })
      })
      it('triggers afterSuccess and dispatches success for the ok ones', function(done){
        let promise = apiChain(store)(next)(action)
        promise.then(()=> {
          expect(store.dispatch).to.have.been.calledWith({
            type: successType1,
            response: response1
          })
          expect(afterSuccess1).to.have.been.calledWith({ getState: store.getState })
          done()
        })
      })
      it('trigger afterError of path2', function(done){
        let promise = apiChain(store)(next)(action)
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
        let promise = apiChain(store)(next)(action)
        promise.then(()=> {
          expect(dispatchedAction.type).to.equal(errorType2)
          expect(dispatchedAction.error).to.be.an.instanceOf(Error)
          done()
        })
      })
    })
  })










  describe('when action is without CALL_API', function(){
    it('passes the action to next middleware', function(){
      action = { type: 'not-CALL_API' };
      apiMiddleware(store)(next)(action);
      expect(next).to.have.been.calledWith(action);
    });
  });

  describe('when action is with `CALL_API`', function(){
    let nockScope;
    beforeEach(function(){
      nockScope = nock(config.API_BASE_URL)
                    .get(path);
    });
    afterEach(function(){
      nock.cleanAll();
    });
    it('sends request to `path` with query and body', function(){
      nockScope = nockScope.reply(200, { status: 'ok' });

      apiMiddleware(store)(next)(action);

      nockScope.done();
    });

    describe('when API call success', function(){
      beforeEach(function(){
        nockScope = nockScope.reply(200, { status: 'ok' });
      });
      it('resolves returned promise when response', function(){
        let promise = apiMiddleware(store)(next)(action);

        return expect(promise).to.be.fulfilled;
      });
      it('dispatches successType with response', function(done){
        let promise = apiMiddleware(store)(next)(action);

        promise.then(()=> {
          expect(next).to.have.been.calledWith({
            type: successType,
            response: { status: 'ok' }
          });
          done();
        });
      });

      it('invokes optional `afterSuccess` with `getState`', function(done){
        action[CALL_API].afterSuccess = sinon.stub();
        store.getState = function() {};
        let promise = apiMiddleware(store)(next)(action);

        promise.then(()=> {
          expect(action[CALL_API].afterSuccess).to
            .have.been.calledWith({ getState: store.getState})
          done();
        });
      });
    });

    describe('when API call fails', function(){
      beforeEach(function(){
        nockScope = nockScope.reply(409, { status: 'not-ok' });
      });
      it('resolves returned promise even if request failed', function(){
        let promise = apiMiddleware(store)(next)(action);

        return expect(promise).to.be.fulfilled;
      });

      it('dispatches `errorType` with err when failed', function(done){
        let dispatchedAction, promise;
        next = (obj)=> { dispatchedAction = obj };
        action[CALL_API].errorType = 'ON_FAILURE';

        promise = apiMiddleware(store)(next)(action);

        promise.then(()=> {
          expect(dispatchedAction.type).to.equal('ON_FAILURE');
          expect(dispatchedAction.error.status).to.equal(409);
          done();
        });
      });

      it('invokes `afterError` with getState if provided', function(done){
        action[CALL_API].afterError = sinon.stub();
        store.getState = function() {};

        let promise = apiMiddleware(store)(next)(action);

        promise.then(()=> {
          expect(action[CALL_API].afterError).to
            .have.been.calledWith({ getState: store.getState})
          done();
        });
      });

    });
  });
});
