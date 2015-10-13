import { Question } from 'containers/Question';
import React from 'react/addons';

let { TestUtils } = React.addons;

describe('Container::Question', function(){
  let props;
  beforeEach(function(){
    props = {
      loadQuestions: sinon.stub()
    }
  });
  it('can be rendered', function(){
    let doc = TestUtils.renderIntoDocument(<Question {...props} />);
  });
});
