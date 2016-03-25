import nock from 'nock';
import apiMiddleware, { CALL_API } from 'middleware/api';

describe('Middleware::Api', function(){
  let store, next;
  let action;
  let successType = 'ON_SUCCESS';
  let url = 'http://the-url/path';

  beforeEach(function(){
    store = {};
    next = sinon.stub();
    action = {
      [CALL_API]: {
        method: 'get',
        url,
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
      nockScope = nock(`http://the-url`)
                    .get('/path');
    });
    afterEach(function(){
      nock.cleanAll();
    });
    it('sends request to `path` with query and body', function(){
      nockScope = nockScope.reply(200, { status: 'ok' });

      apiMiddleware(store)(next)(action);

      nockScope.done();
    });

    it('resolves returned promise when response when success', function(){
      nockScope = nockScope.reply(200, { status: 'ok' });

      let promise = apiMiddleware(store)(next)(action);

      return expect(promise).to.be.fulfilled;
    });
    it('dispatch successType with response when success', function(done){
      nockScope = nockScope.reply(200, { status: 'ok' });
      let promise = apiMiddleware(store)(next)(action);

      promise.then(()=> {
        expect(next).to.have.been.calledWith({
          type: successType,
          response: { status: 'ok' }
        });
        done();
      });
    });
  });
});
