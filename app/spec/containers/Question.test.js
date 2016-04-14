import React from 'react'
import TestUtils from 'react-addons-test-utils'
import rewire from 'rewire'
import reactMocker from 'test/utils/reactMocker'

describe.only('Container::::Question', function(){
  let props
  let Container, Question
  beforeEach(function(){
    Container = rewire('containers/Question')
    Question = Container.Question
  })

  function renderDoc () {
    return TestUtils.renderIntoDocument(<Question {...props}/>)
  }
  beforeEach(function(){
    props = {
    }
  })

  it('can be rendered', function(){
    let doc = renderDoc()
  })

})
