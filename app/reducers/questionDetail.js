import * as ActionType from 'actions/questions'
import _ from 'lodash'
import Immutable from 'immutable'

let defaultState = Immutable.fromJS({
  user: {}
})

export default function(state = defaultState, action) {
  switch(action.type) {
    case ActionType.LOADED_QUESTION_DETAIL:
      return state.merge(action.response)

    case ActionType.LOADED_QUESTION_USER:
      return state.merge({ user: action.response })

    default:
      return state
  }
}
