import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class Questions extends Component {
  render() {
    return (
      <div>
        Questions component
        {
          this.props.questions.map((q)=> {
            return (
              <div key={q.id}>
                <Link to={`/questions/${q.id}`}> { q.content }</Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

Questions.propTypes = {
  questions: PropTypes.array.isRequired
}

export default Questions
