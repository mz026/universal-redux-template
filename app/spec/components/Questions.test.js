import React from 'react'
import TestUtils from 'react-addons-test-utils'

import Questions from 'components/Questions'

describe('Component::::Questions', function(){
  let props, Link
  beforeEach(function(){
    Link = React.createClass({
      render() {
        return (<div>MOCK COMPONENT CLASS</div>)
      }
    })

    Questions.__Rewire__('Link', Link)

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

  it('renders questions', function(){
    let doc = renderDoc()
    let questionComps = TestUtils.scryRenderedComponentsWithType(doc, Link)

    expect(questionComps.length).to.equal(2)
  })
})
