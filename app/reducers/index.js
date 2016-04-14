import { combineReducers } from 'redux';
import questions from 'reducers/questions';
import questionDetail from 'reducers/questionDetail';

const rootReducer = combineReducers({
  questions,
  questionDetail
});

export default rootReducer;
