import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Conversation from './conversation';
import Navbar from './navbar';


export default class Messenger extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const conversations = this.props.conversations.map(conv => {
      if(conv.sender_id === this.props.user.id || conv.recipient_id === this.props.user.id) {
        return <Conversation conversation={conv} queryMessages={this.props.queryMessages} messages={this.props.messages} user={this.props.user} sendMessage={this.props.sendMessage} startConversation={this.props.startConversation} />
      }
    })
    if (this.props.user.username === this.props.messageUser.username) {
      return (
        <div className="messenger-container">
          <div>You can't message yourself</div>
          <Link to="/feed"><button>back to feed!</button></Link>
        </div>
        )
    } return (
      <div className="messenger-container">
        <Navbar />
        <h1>Your Chats</h1>
            {conversations} 
      </div>
    )
  }
}