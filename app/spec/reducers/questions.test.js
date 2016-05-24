import questionReducer from 'reducers/questions'
import * as ActionType from 'actions/questions'

describe('Reducer::Question', function(){
  it('returns an empty array as default state', function(){
    let action = { type: 'unknown' }
    let newState = questionReducer(undefined, { type: 'unknown' })
    expect(newState.toJS()).to.deep.equal([])
  })

  describe('on LOADED_QUESTIONS', function(){
    it('returns the `response` in given action', function(){
      let action = {
        type: ActionType.LOADED_QUESTIONS,
        response: { responseKey: 'responseVal' }
      }
      let newState = questionReducer(undefined, action)
      expect(newState.toJS()).to.deep.equal(action.response)
    })
  })
})
