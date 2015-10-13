import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';
import questions from 'reducers/questions';


let defaultCurrentUser = {
  name: 'default-current-username',
  nickname: 'default-nickname'
};

function currentUser (state = defaultCurrentUser, action) {
  switch(action.type) {
    case ActionTypes.FETCHED_USER:
      return action.user;
      break;

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentUser,
  questions
});

export default rootReducer;
