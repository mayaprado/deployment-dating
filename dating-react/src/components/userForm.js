import React, { Component } from 'react';

export default class UserForm extends Component {
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
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="form-container">
      <form onSubmit={this.handleSubmit}>
        <label>
          <input 
            type="text" 
            name="username"
            placeholder="username" 
            onChange={this.handleChange}
            value={this.state.username} />
        </label>
        <br />
        <label>
          <input 
            type="password" 
            name="password"
            placeholder="password"  
            onChange={this.handleChange}
            value={this.state.password} />
        </label>
        <br />
        <button type="submit" value="Sing in">Sign in</button>
      </form>
      </div>
    );
  }
}