import React, { Component } from 'react';
import Photo from './photo';
import Measure from 'react-measure';
import Navbar from './navbar';


export default class User extends Component {
  constructor(props){
    super(props);
    this.state = {user: this.props.user, photos: this.props.photos, width: -1};
    this.message = this.message.bind(this);
  }

  message(ev) {
    ev.preventDefault();
    this.props.startConversation(this.state.user);
    this.props.history.push('./messenger');
  }

  render() {
    const width = this.state.width;
    return (
        <div className="user-container">
        <Navbar />
          <h1>{this.state.user.username}</h1>
          <h3>{this.state.user.bio}</h3>
          <input type="button" onClick={this.message} value="Send Message" />
          <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
          {
            ({ measureRef }) => {
              if (width < 1 ){
                return <div ref={measureRef}></div>;
              }
              let columns = 1;
              if (width >= 480){
                columns = 2;
              }
              if (width >= 1024){
                columns = 3;
              }
              if (width >= 1824){
                columns = 4;
              }
                return (
                  <div ref={measureRef} className="user-image-container">
                   <Photo photos={this.state.photos} columns={columns} />
                  </div>
                  )
              }
            }
          </Measure>
        </div>
        )
  }
}