import React from 'react'
import TestUtils from 'react-addons-test-utils'

import Questions from 'components/Questions'

describe('Component::::Questions', function(){
  let props
  beforeEach(function(){
    props = {
      questions: [
        { id: 1, content: 'the-content-1' },
        { id: 2, content: 'the-content-2' }
      ]
    }
  })
  function renderDoc () {
    return TestUtils.renderIntoDocument(<Questions {...props} />)
  }

  it('can be rendered', function(){
    let doc = renderDoc()
    let questionComps = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'p')

    expect(questionComps.length).to.equal(2)
  })
})
