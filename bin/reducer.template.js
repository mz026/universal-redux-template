import * as ActionType from 'actions/PATH_PREFIX/COMPONENT_NAME';

let defaultState = {};

export default function(state = defaultState, action) {
  switch(action.type) {
    case 'case':
      return 'dummy';
      break;

    default:
      return state;
  }
}
