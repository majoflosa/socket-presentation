import socketClient from 'socket.io-client';

let initialState = {
    nickname: '',
    onlineUsers: [],
    messages: []
};

const SET_NICKNAME = 'SET_NICKNAME';
const ADD_USER = 'ADD_USER';
const SEND_MESSAGE = 'SEND_MESSAGE';

export function setNickname( nickname ) {
    return {
        type: SET_NICKNAME,
        payload: nickname
    };
}

export function addUser( user ) {
    if ( !user ) return false;

    // let socket = socketClient.connect( 'http://localhost:4000' );

    // socket.on( 'connect', () => {
    //     console.log( 'a client has connected: ', user );

    //     socket.emit( 'join', { user: user } );

    //     socket.on( 'message', (data) => {
    //         sendMessage( data.user, data.message );
    //     })
        
    //     socket.emit( 'message', `${user} has joined the chat room.` );
    // });
    
    return {
        type: ADD_USER,
        payload: user
        // payload: { user: user, message: {user: user, message: `${user} has joined the chat room.`} }
    };
}

export function sendMessage( user, message ) {
    console.log( `sendMessage invoked. User: ${user}, Message: ${message}` );
    return {
        type: SEND_MESSAGE,
        payload: { user: user, message: message }
    };
}


export default function reducer( state = initialState, action ) {
    switch( action.type ) {
        case SET_NICKNAME:
            return { ...state, nickname: action.payload };
        case ADD_USER:
            return { 
                ...state, 
                onlineUsers: [...state.onlineUsers, action.payload],
                // onlineUsers: [...state.onlineUsers, action.payload.user],
                // messages: [...state.messages, action.payload.message]
            };
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        default:
            return state;
    }
}