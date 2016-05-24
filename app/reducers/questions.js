import * as ActionType from 'actions/questions'
import Immutable from 'immutable'

let defaultState = Immutable.fromJS([])
function questionsReducer (state = defaultState, action) {
  switch(action.type) {
    case ActionType.LOADED_QUESTIONS:
      return Immutable.fromJS(action.response)
      break
    default:
      return state
  }
}

export default questionsReducer
