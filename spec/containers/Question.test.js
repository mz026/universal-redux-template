import { Question } from 'containers/Question';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

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
