import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Bio extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.user.username,
      bio: ''
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
      <form onSubmit={this.handleSubmit}>
        <label>
          <textarea 
            type="text" 
            name="bio" 
            onChange={this.handleChange} />
        </label>
        <button type="submit" value="Submit">Submit</button>
      </form>
    );
  }
}