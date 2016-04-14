import React from 'react'
import TestUtils from 'react-addons-test-utils'

import Container, { Question } from 'containers/Question'

describe('Container::::Question', function(){
  let props

  function renderDoc () {
    return TestUtils.renderIntoDocument(<Question {...props}/>)
  }
  beforeEach(function(){
    props = {
      loadQuestionDetail: sinon.stub(),
      params: {
        id: 222
      },
      question: {
        id: 222,
        content: 'the-question-content',
        user: {
          id: 1234,
          name: 'jack'
        }
      }
    }
  })

  it('fetches question details on mounted', function(){
    let doc = renderDoc()
    expect(props.loadQuestionDetail).to.have.been.calledWith({ id: props.params.id })
  })

})
