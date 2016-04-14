import React, { Component, PropTypes } from 'react'

class Questions extends Component {
  render() {
    return (
      <div>
        Questions component
        {
          this.props.questions.map((q)=> {
            return (
              <p key={q.id}> { q.content }</p>
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
