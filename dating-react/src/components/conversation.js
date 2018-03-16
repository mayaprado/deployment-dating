import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class Conversation extends Component {
  constructor(props){
    super(props);
    this.state = { sender: {}, body: "", open: true }
    this.findSender = this.findSender.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.openConversation = this.openConversation.bind(this);
  }

  componentDidMount(){
    if(this.props.conversation.recipient_id === this.props.user.id) {
      this.findSender(this.props.conversation.sender_id);
    } else {
      this.findSender(this.props.conversation.recipient_id);
    }
  }

  openConversation(ev) {
    ev.preventDefault();
    this.setState(prevState => {
    prevState.open = !prevState.open;
    return prevState;
     });
  }

  findSender(id) {
    console.log("in findSender, id is ", id);
    axios(`http://localhost:3000/users/${id}`, {
      method: "GET"
    }).then(resp => {
      this.setState({ sender: resp.data.user });
    })
    .catch(err => console.log(`err: ${err}`));
  }

  handleChange(ev) {
    ev.preventDefault();
    this.setState({ body: ev.target.value });
  }

  sendMessage(ev) {
    ev.preventDefault();
    const data = {
      body: this.state.body, 
      user_id: this.props.user.id, 
      conversation_id: this.props.conversation.id
    };
    console.log('in sendMessage, data is ', data);
    this.props.sendMessage(data);
  }

  render() {
    const messages = this.props.messages.map(mess => {
      console.log("mess", mess)
      if(this.props.conversation.id === mess.conversation_id) {
        if(mess.user_id === this.props.user.id) {
          return (
            <div className="your-message">
              <h4>You:</h4>
              <p>{mess.body}</p>
            </div>
          )
        } else {
          return (
            <div className="their-message">
              <h4>{this.state.sender.username}:</h4>
              <p>{mess.body}</p>
            </div>
          )
        }
      }
    })
    if (this.state.open) {
    return (
      <div>
      <input type="button" value="Close Chat" onClick={this.openConversation} />
       <div className="conversation-container">
       <h4>Chat with {this.state.sender.username}</h4>
        {messages}
       </div>
       <div className="new-message-container">
        <form onSubmit={this.sendMessage}>
          <textarea name="body" onChange={this.handleChange} placeholder="New message" />
          <input type="submit" value="submit" />
        </form>
      </div>
      </div>
    )
  } else {
    return (
      <div>
        <a onClick={this.openConversation}><h3>Chat with {this.state.sender.username}</h3></a> 
      </div> 
              
      )
  }
  }
}