import React, { Component } from 'react';
import { connect } from 'react-redux';

import { persistUser } from '../actions/sessionActions'
import { getFloors } from '../util/floorApiUtil'

import Floor from './floor'
import AddPatientForm from './addPatientForm'

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      floors: []
    }
    this.logout = this.logout.bind(this)
    this.updateRooms = this.updateRooms.bind(this)
  }

  async componentDidMount() {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      this.props.persistUser(JSON.parse(loggedInUser))
      this.setState({ loggedIn: true })
    }

    const floors = await getFloors()
    this.setState({ floors })
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.setState({ loggedIn: false });
  }

  async updateRooms() {
    const floors = await getFloors()
    this.setState({ floors })
  }

  render() {
    const { loggedIn, floors } = this.state
    const { currentUser } = this.props

    return (
      <div>
        <h2>Welcome to the main page!</h2>
        <h4>You are {(!currentUser || !loggedIn) && 'not'} logged in.</h4>

        <div className="floor-add-cont">
          <div className="floors-cont">
            {
              floors.map(floor => {
                return <Floor floor={floor} key={floor.uuid} />
              })
            }
          </div>

          <AddPatientForm
            rooms={[]}
            updateRooms={this.updateRooms} />
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
