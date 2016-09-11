import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import requireAssets from 'lib/requireAssets'

class Intro extends Component {
  render() {
    return (
      <div className="intro">
        <h1>Intro Page</h1>
        <div>
          <img src={ requireAssets("/assets/images/head.png" ) }/>
        </div>
        <Link to="/questions">to question</Link>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Intro);
