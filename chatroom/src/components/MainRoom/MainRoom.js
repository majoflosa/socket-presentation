import React, { Component } from 'react';
import socketClient from 'socket.io-client';

import Nav from './Nav';

import {connect} from 'react-redux';
import { sendMessage } from '../../redux/reducer';

class MainRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageField: ''
        };

        this.changeMessageField = this.changeMessageField.bind( this );
        this.handleSendMessage = this.handleSendMessage.bind( this );
    }

    changeMessageField( value ) {
        this.setState({ messageField: value });
    }

    handleSendMessage( user, message ) {
        this.props.sendMessage( user, message );
        this.setState({ messageField: '' });
    }

  render() {
    console.log( this.props )
    return (
      <div>
        <Nav />

        <div className="message-list">
            {this.props.messages.map( (message, i) => {
                return (
                    <article className="message-wrap" key={i}>
                        <span className="user">{message.user} says:</span>
                        <p className="message">{message.message}</p>
                    </article>
                );
            })}
        </div>

        <div className="message-form-wrap">
            <textarea 
                onChange={(e) => this.changeMessageField(e.target.value)}
                rows="3" 
                value={this.state.messageField}
                className="message-form" 
                placeholder="Enter message...">
            </textarea>
            <button onClick={() => this.handleSendMessage( this.props.nickname, this.state.messageField)} className="send-btn">Send</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        nickname: state.nickname,
        onlineUsers: state.onlineUsers,
        messages: state.messages
    };
};

const mapDispatchToProps = {
    sendMessage
}

export default connect( mapStateToProps, mapDispatchToProps )(MainRoom);