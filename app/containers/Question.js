import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadQuestionDetail } from 'actions/questions'
import Helmet from 'react-helmet'

class Question extends Component {
  static fetchData({ store, params }) {
    let { id } = params
    return store.dispatch(loadQuestionDetail({ id }))
  }
  componentDidMount() {
    let { id } = this.props.params
    this.props.loadQuestionDetail({ id })
  }
  render() {
    let { question } = this.props
    return (
      <div>
        <Helmet
          title={'Question ' + this.props.params.id}
        />
        <h2>{ question.get('content') }</h2>
        <h3> User: {question.getIn(['user', 'name'])} </h3>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { question: state.questionDetail }
}

Question.propTypes = {
  question: PropTypes.object.isRequired
}

export { Question }
export default connect(mapStateToProps, { loadQuestionDetail })(Question)
