import nock from 'nock';
import apiMiddleware, { CALL_API } from 'middleware/api';
import config from 'config';

describe('Middleware::Api', function(){
  let store, next;
  let action;
  let successType = 'ON_SUCCESS';
  let path = '/the-url/path';

  beforeEach(function(){
    store = {};
    next = sinon.stub();
    action = {
      [CALL_API]: {
        method: 'get',
        path,
        successType
      }
    };
  });

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
