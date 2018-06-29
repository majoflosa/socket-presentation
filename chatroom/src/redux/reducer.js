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
    return {
        type: ADD_USER,
        payload: user
    };
}

export function sendMessage( user, message ) {
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
                onlineUsers: [...state.onlineUsers, action.payload]
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