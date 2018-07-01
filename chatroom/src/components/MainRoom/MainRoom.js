import React, { Component } from 'react';
import socketClient from 'socket.io-client';

import Nav from './Nav';

import {connect} from 'react-redux';
import { sendMessage, addUser } from '../../redux/reducer';

class MainRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageField: '',
            messages: []
        };

        // absolute ip address, so other devices can connect
        this.socket = socketClient.connect( 'http://172.31.99.32:4000' );

        this.changeMessageField = this.changeMessageField.bind( this );
        this.handleSendMessage = this.handleSendMessage.bind( this );
        this.updateMessageList = this.updateMessageList.bind( this );
        this.socketConnection = this.socketConnection.bind( this );
    }

    componentDidMount() {
        this.socketConnection();
    }

    updateMessageList( messages ) {
        this.setState({ messages: messages });
    }

    changeMessageField( value ) {
        this.setState({ messageField: value });
    }

    handleSendMessage( user, message ) {
        // this.props.sendMessage( user, message );
        if ( this.socket ) {
            this.socket.emit( 'message', {user: this.props.nickname, message: this.state.messageField} );
        }
        this.setState({ messageField: '' });
    }

    socketConnection() {
        // console.log( this.socket );
        let { nickname, sendMessage, addUser } = this.props;
        if ( !nickname ) return false;

        this.socket.on( 'connect', () => {
            console.log( 'a client has connected: ', nickname );
    
            this.socket.emit( 'join', { user: nickname } );
            this.socket.emit( 'message', {
                user: nickname,
                message: `${nickname} has joined the chat room.`,
                joined: true
            });
    
            this.socket.on( 'message', (data) => {
                sendMessage( data.sMessages );
            });

            this.socket.on( 'new user', (data) => {
                addUser( data.sUsers );
            });
            
        });

    }
    

    render() {
        // console.log( 'messages: ', this.props.messages )
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
        );
    } // end render

} // end class

const mapStateToProps = state => {
    return {
        nickname: state.nickname,
        onlineUsers: state.onlineUsers,
        messages: state.messages
    };
};

const mapDispatchToProps = {
    sendMessage,
    addUser
}

export default connect( mapStateToProps, mapDispatchToProps )(MainRoom);