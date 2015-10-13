import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUserData, fetchUserData2 } from '../actions';

class UserDataPage extends Component {
  static fetchData({ query, params, store }) {
    return fetchUserData(store, params.username);
  }

  componentDidMount() {
    this.props.fetchUserData2(this.props.params.username);
  }

  render() {
    let { currentUser, username } = this.props;
    return (
      <div>
        <h2>{username}</h2>
        <li>name: {currentUser.name}</li>
        <li>nickname: {currentUser.nickname}</li>
      </div>
    );
  }
}
UserDataPage.contextTypes = {
  history: PropTypes.object
};

function selector (state, ownProps) {
  return {
    currentUser: state.currentUser,
    username: ownProps.username
  };
}
export default connect(selector, { fetchUserData2 })(UserDataPage);
