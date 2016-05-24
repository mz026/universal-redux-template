import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { List } from 'immutable'

class Questions extends Component {
  render() {
    return (
      <div>
        Questions component
        {
          this.props.questions.map((q)=> {
            let id = q.get('id')
            return (
              <div key={id}>
                <Link to={`/questions/${id}`}> { q.get('content') }</Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

Questions.propTypes = {
  questions: PropTypes.instanceOf(List).isRequired
}

export default Questions
