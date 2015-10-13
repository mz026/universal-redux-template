import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Intro extends Component {
  render() {
    return (
      <div>
        <h1>Intro Page</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Intro);
