import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadQuestions } from 'actions/questions';
import _ from 'lodash';

import { CALL_API, createRequest } from 'middleware/api';

class Question extends Component {
  static fetchData({ store }) {
    let action = loadQuestions();
    let { request } = action[CALL_API];

    let getState = store.getState;
    let next = store.dispatch;

    return createRequest({ getState, next, request });
  }

  componentDidMount() {
    this.props.loadQuestions();
  }
  render() {
    return (
      <div>
        <h2>Question</h2>
        {
          _.map(this.props.questions, (q)=> {
            return (
              <p key={q.id}> { q.content }</p>
            );
          })
        }

      </div>
    );
  }
}

function mapStateToProps (state) {
  return { questions: state.questions };
}

export { Question };
export default connect(mapStateToProps, { loadQuestions })(Question);
