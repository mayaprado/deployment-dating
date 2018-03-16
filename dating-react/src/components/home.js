import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserForm from './userForm'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    console.log(`handling submit: ${data}`);
    this.props.submit(data);
    this.props.history.push('/feed');
  }

  render() {
    return (
      <div className="home-container">
        <h1>Welcome to <span>Save the Date</span>!</h1>
        <h3>App that brings people together</h3>
        <h3>Sign in</h3>
        <UserForm submit={this.onSubmit} />
        <p>Don't have an account?<Link to="/register"><a> Sign up!</a></Link></p>  
        <br />
      </div>
    )
  }
}