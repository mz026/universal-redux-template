import questionReducer from 'reducers/questions';
import * as ActionType from 'actions/questions';

describe('Reducer::Question', function(){
  it('returns an empty array as default state', function(){
    // setup
    let action = { type: 'unknown' };

    // execute
    let newState = questionReducer(undefined, { type: 'unknown' });

    // verify
    expect(newState).to.deep.equal([]);
  });

  describe('on LOADED_QUESTIONS', function(){
    it('returns the `response` in given action', function(){
      // setup
      let action = {
        type: ActionType.LOADED_QUESTIONS,
        response: { responseKey: 'responseVal' }
      };

      // execute
      let newState = questionReducer(undefined, action);

      // verify
      expect(newState).to.deep.equal(action.response);
    });
  });
});
