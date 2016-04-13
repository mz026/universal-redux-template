import reducer from 'reducers/PATH_PREFIX/COMPONENT_NAME';
import * as ActionType from 'actions/PATH_PREFIX/COMPONENT_NAME';

describe.only('Reducer::COMPONENT_FULL_NAMESPACE', function(){
  describe('on ACTION_TYPE', function(){
    it('should pass', function(){
      let action = { type: 'case' };
      let newState = reducer(undefined, action);

      expect(newState).to.equal('dummy');
    });
  });
});
