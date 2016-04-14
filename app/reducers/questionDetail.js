import * as ActionType from 'actions/questions';
import _ from 'lodash'

let defaultState = {
  user: {}
};

export default function(state = defaultState, action) {
  let cloned
  switch(action.type) {
    case ActionType.LOADED_QUESTION_DETAIL:
      cloned = _.clone(state)
      return _.merge(cloned, action.response)

    case ActionType.LOADED_QUESTION_USER:
      cloned = _.clone(state)
      return _.merge(cloned, { user: action.response })

    default:
      return state
  }
}
