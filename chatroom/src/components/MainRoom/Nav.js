import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Nav extends Component {
  render() {
    return (
      <div className="main-nav">
        <Link to="/">Home</Link>

        <h1>Online:</h1>
        <div className="online-users">
        {this.props.onlineUsers.map( (user, i) => {
            return <p key={i} className="user">{user}</p>;
        })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        onlineUsers: state.onlineUsers
    };
};

export default connect( mapStateToProps )(Nav);