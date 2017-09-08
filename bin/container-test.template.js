import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { mount } from 'enzyme'
import Container, { COMPONENT_NAME } from 'containers/PATH_PREFIX/COMPONENT_NAME'

describe.only('Container::COMPONENT_FULL_NAMESPACE', () => {
  let props

  function renderDoc () {
    return mount(<COMPONENT_NAME {...props}/>)
  }
  beforeEach(() => {
    props = {
    }
  })

  it('can be rendered', () => {
    let doc = renderDoc()
  })

})
