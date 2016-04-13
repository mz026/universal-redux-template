import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class COMPONENT_NAME extends Component {
  render() {
    return (
      <div>COMPONENT_NAME container</div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

COMPONENT_NAME.propTypes = {

}

export { COMPONENT_NAME }
export default connect(mapStateToProps)(COMPONENT_NAME)
