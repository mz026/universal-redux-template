import Container, { QuestionContainer } from 'containers/Questions'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

describe('Container::Questions', function(){
  let props
  let Link, Questions
  beforeEach(function(){
    props = {
      loadQuestions: sinon.stub(),
      questions: [
        { id: 1, content: 'question content 1' },
        { id: 2, content: 'question content 1' }
      ]
    }

    Link = React.createClass({
      render() {
        return (<div>MOCK COMPONENT CLASS</div>)
      }
    })
    Questions = React.createClass({
      render() {
        return (<div>MOCK COMPONENT CLASS</div>)
      }
    })
    Container.__Rewire__('Link', Link)
    Container.__Rewire__('Questions', Questions)
  })

  it('renders Questions with questions in props', function(){
    let doc = TestUtils.renderIntoDocument(<QuestionContainer {...props} />)
    let questionsComp = TestUtils.findRenderedComponentWithType(doc, Questions)

    expect(questionsComp.props.questions).to.equal(props.questions)
  })
  it('renders a link back to `/`', function(){
    let doc = TestUtils.renderIntoDocument(<QuestionContainer {...props} />)

    let link = TestUtils.findRenderedComponentWithType(doc, Link)

    expect(link).not.to.be.undefined
    expect(link.props.to).to.equal('/')
  })
})
