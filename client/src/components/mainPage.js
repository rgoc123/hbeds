import React, { Component } from 'react';
import { connect } from 'react-redux';

import { persistUser } from '../actions/sessionActions'
import { getRooms } from '../util/roomApiUtil'

import Room from './room'
import AddPatientForm from './addPatientForm'

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      rooms: []
    }
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      this.props.persistUser(JSON.parse(loggedInUser))
      this.setState({ loggedIn: true })
    }

    const rooms = await getRooms()
    this.setState({ rooms })
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.setState({ loggedIn: false });
  }

  render() {
    const { loggedIn, rooms } = this.state
    const { currentUser } = this.props

    return (
      <div>
        <h2>Welcome to the main page!</h2>
        <h4>You are {(!currentUser || !loggedIn) && 'not'} logged in.</h4>

        <div className="floor-add-cont">
          <Room />
          <AddPatientForm rooms={rooms} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    persistUser: user => dispatch(persistUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
