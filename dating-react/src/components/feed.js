import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountFeed from './accountFeed';
import Navbar from './navbar'; 

export default class Feed extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.userAccounts = this.userAccounts.bind(this);
  }

  logout(){
    this.props.logout();
    this.props.history.push('/');
  }

  userAccounts(userDatum, index) {
    return <AccountFeed userDatum={userDatum} index={index} seeUser={this.props.seeUser} history={this.props.history} />;
  }

  render() {
    const users = this.props.users.map(this.userAccounts);
    if (this.props.logged === true) {
    return (
      <div className="feed-container">
       <Navbar />
       {users}
      </div>
    )
  }
  else {
    return (
      <div className="feed-container">
        <h2>You need to login to see this page</h2>
        <Link to="/"><button>Login!</button></Link>
      </div>
      )
    }
  }
}