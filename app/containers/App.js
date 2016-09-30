import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

class App extends Component {
  render() {
    return (
      <div>
        <Helmet
          defaultTitle="Redux real-world example"
          titleTemplate="%s - Redux real-world example"
          meta={[
            {"name": "description", "content": "A boilerplate doing universal/isomorphic rendering with Redux + React-router + Express"},
          ]}
          htmlAttributes={{"lang": "en"}}
        />
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(App)
