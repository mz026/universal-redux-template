import React from 'react'
import TestUtils from 'react-addons-test-utils'
import rewire from 'rewire'
import reactMocker from 'test/utils/reactMocker'

describe.only('Container::COMPONENT_FULL_NAMESPACE', function(){
  let props
  let Container, COMPONENT_NAME
  beforeEach(function(){
    Container = rewire('containers/PATH_PREFIX/COMPONENT_NAME')
    COMPONENT_NAME = Container.COMPONENT_NAME
  })

  function renderDoc () {
    return TestUtils.renderIntoDocument(<COMPONENT_NAME {...props}/>)
  }
  beforeEach(function(){
    props = {
    }
  })

  it('can be rendered', function(){
    let doc = renderDoc()
  })

})
