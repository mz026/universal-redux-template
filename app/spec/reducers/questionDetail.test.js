import reducer from 'reducers/questionDetail';
import * as ActionType from 'actions/questionDetail';

describe.only('Reducer::::QuestionDetail', function(){
  describe('on ACTION_TYPE', function(){
    it('should pass', function(){
      let action = { type: 'case' };
      let newState = reducer(undefined, action);

      expect(newState).to.equal('dummy');
    });
  });
});
