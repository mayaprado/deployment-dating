import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './userForm';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
    this.props.history.push('/account');
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="app-container">
        <h1>Create an account!</h1>
        <form onSubmit={this.handleSubmit}>
        <label>Name
          <input 
            type="text" 
            name="username" 
            onChange={this.handleChange}
            value={this.state.username} />
        </label>
        <br />
        <label>Password
          <input 
            type="password" 
            name="password" 
            onChange={this.handleChange}
            value={this.state.password} />
        </label>
        <button type="submit" value="Submit">Submit</button>
        </form>
        <p><Link to="/"><button>Back Home</button></Link></p>
      </div>
    )
  }
}