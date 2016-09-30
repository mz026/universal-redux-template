import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { mount } from 'enzyme'
import Container, { COMPONENT_NAME } from 'containers/PATH_PREFIX/COMPONENT_NAME'

describe.only('Container::COMPONENT_FULL_NAMESPACE', function(){
  let props

  function renderDoc () {
    return mount(<COMPONENT_NAME {...props}/>)
  }
  beforeEach(function(){
    props = {
    }
  })

  it('can be rendered', function(){
    let doc = renderDoc()
  })

})
