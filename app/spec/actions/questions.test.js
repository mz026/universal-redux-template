import { CALL_API, CHAIN_API } from 'middleware/api'

import * as actionCreator from 'actions/questions'
import * as ActionType from 'actions/questions'

describe('Action::Question', function(){
  describe('#loadQuestions()', function(){
    it('returns action `CALL_API` info', function(){
      let action = actionCreator.loadQuestions()
      expect(action[CALL_API]).to.deep.equal({
        method: 'get',
        path: '/api/questions',
        successType: ActionType.LOADED_QUESTIONS
      })
    })
  })

  describe('#loadQuestionDetail({id})', function(){
    let id = 'the-id'
    it('returns a CHAIN_API to fetch question first', function(){
      let action = actionCreator.loadQuestionDetail({ id })

      expect(action[CHAIN_API][0]()[CALL_API]).to.deep.equal({
        method: 'get',
        path: `/api/questions/${id}`,
        successType: ActionType.LOADED_QUESTION_DETAIL
      })
    })
    it('fetches user data after fetching question', function(){
      let action = actionCreator.loadQuestionDetail({ id })
      let questionRes = { userId: '1234' }

      expect(action[CHAIN_API][1](questionRes)[CALL_API]).to.deep.equal({
        method: 'get',
        path: `/api/users/${questionRes.userId}`,
        successType: ActionType.LOADED_QUESTION_USER
      })
    })
  })
})
