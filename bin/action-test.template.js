import * as actionCreators from 'actions/PATH_PREFIX/COMPONENT_NAME';
import * as ActionType from 'actions/PATH_PREFIX/COMPONENT_NAME';

describe.only('Action::COMPONENT_FULL_NAMESPACE', function(){
  describe('#THE_FUNC_NAME', function(){
    it('returns an action of desired attrs', function(){
      let action = actionCreators.THE_FUNC_NAME();
      expect(action).to.deep.equal({ type: ActionType.MY_EVENT_TYPE })
    });
  });
});
