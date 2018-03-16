import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bio from './bio';
import Gallery from './gallery';
import Navbar from './navbar';

export default class Account extends Component {
  constructor(props){
    super(props);
    this.state = {editing: false}
    this.logout = this.logout.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  logout(){
    this.props.logout();
    this.props.history.push('/');
  }

  editProfile() {
    this.setState(prevState => {
      const nextState = { ...prevState, editing: !prevState.editing };
      return nextState;
    });
  }

  render() {
    let checkBioEdit = null;
    if (this.state.editing) {
      checkBioEdit = (
        <Bio submit={this.props.change} user={this.props.user} />
      );
    }
    if (this.props.logged === true) {
    return (
      <div className="profile-container">
      <Navbar />
       <h1>Hello, {this.props.user.username}! Wellcome to your account!</h1>
       <br />
       <div className="bio">
       <h3>Your bio</h3>
       <h3>{this.props.user.bio}<a onClick={this.editProfile}> (edit)</a></h3>
       </div>
       {checkBioEdit}
       <Gallery user={this.props.user} />
       <button className="logout" onClick={this.logout}>Logout</button>
      </div>
    )
  }
  else {
    return (
      <div className="app-container">
        <h2>You need to login to see this page</h2>
        <Link to="/"><button>Login!</button></Link>
      </div>
      )
    }
  }
}