import Container, { Question } from 'containers/Question';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

describe.only('Container::Question', function(){
  let props;
  let Link;
  beforeEach(function(){
    props = {
      loadQuestions: sinon.stub(),
      questions: [
        { id: 1, content: 'question content 1' },
        { id: 2, content: 'question content 1' }
      ]
    };

    Link = React.createClass({
      render() {
        return (<div>MOCK COMPONENT CLASS</div>)
      }
    });
    Container.__Rewire__('Link', Link);
  });

  it('renders questions according to `props.questions`', function(){
    let doc = TestUtils.renderIntoDocument(<Question {...props} />);
    let questionElements = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'p');

    expect(questionElements.length).to.equal(props.questions.length);
  });
  it('renders a link back to `/`', function(){
    let doc = TestUtils.renderIntoDocument(<Question {...props} />);

    let link = TestUtils.findRenderedComponentWithType(doc, Link);

    expect(link).not.to.be.undefined;
    expect(link.props.to).to.equal('/');
  });
});
