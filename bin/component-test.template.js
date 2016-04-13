import React from 'react'
import TestUtils from 'react-addons-test-utils'

import COMPONENT_NAME from 'components/PATH_PREFIX/COMPONENT_NAME'

describe.only('Component::COMPONENT_FULL_NAMESPACE', function(){
  let props
  beforeEach(function(){
    props = {}
  })
  function renderDoc () {
    return TestUtils.renderIntoDocument(<COMPONENT_NAME {...props} />)
  }

  it('can be rendered', function(){
    let doc = renderDoc()
  })
})
