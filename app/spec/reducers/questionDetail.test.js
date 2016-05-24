import reducer from 'reducers/questionDetail'
import * as ActionType from 'actions/questions'
import Immutable from 'immutable'

describe('Reducer::::QuestionDetail', function(){
  describe('on ACTION_TYPE', function(){
    describe('on LOADED_QUESTION_DETAIL', function(){
      it('merges state to response', function(){
        let action = {
          type: ActionType.LOADED_QUESTION_DETAIL,
          response: { key: 'val' }
        }

        let newState = reducer(undefined, action)

        expect(newState.toJS()).to.deep.equal({ user: {}, key: 'val' })
      })
    })

    describe('on LOADED_QUESTION_USER', function(){
      it('merge `user` to state', function(){
        let action = {
          type: ActionType.LOADED_QUESTION_USER,
          response: { key: 'val' }
        }
        let initState = Immutable.fromJS({
          id: 'the-question-id',
          user: {}
        })
        let newState = reducer(initState, action)

        expect(newState.toJS()).to.deep.equal({
          id: 'the-question-id',
          user: {
            key: 'val'
          }
        })
      })
    })
  })
})
