import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadQuestions } from 'actions/questions';
import { Link } from 'react-router';
import _ from 'lodash';

class Question extends Component {
  static fetchData({ store }) {
    return store.dispatch(loadQuestions());
  }

  componentDidMount() {
    this.props.loadQuestions();
  }
  render() {
    return (
      <div>
        <h2>Questionx</h2>
        {
          _.map(this.props.questions, (q)=> {
            return (
              <p key={q.id}> { q.content }</p>
            );
          })
        }

        <Link to="/">Back to Home</Link>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { questions: state.questions };
}

export { Question };
export default connect(mapStateToProps, { loadQuestions })(Question);
