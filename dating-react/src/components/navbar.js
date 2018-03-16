import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="./feed" className="nav-link"><h3>FEED</h3></Link>
        <Link to="./account" className="nav-link"><h3>ACCOUNT</h3></Link>
        <Link to="./messenger" className="nav-link"><h3>MESSENGER</h3></Link>
      </div>
    );
  }
}