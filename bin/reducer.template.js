import Immutable from 'immutable';
import * as ActionType from 'actions/PATH_PREFIX/COMPONENT_NAME';

let defaultState = Immutable.fromJS({});

export default function(state = defaultState, action) {
  switch(action.type) {
    case 'case':
      return 'dummy';
      break;

    default:
      return state;
  }
}
