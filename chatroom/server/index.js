const app = require( 'express' )();
const server = require( 'http' ).Server( app );
const io = require( 'socket.io' )(server);
const port = 4000;

server.listen( port, () => console.log( `Server is running on port ${port}`) );

let sMessages = [];
let sUsers = [];

io.on( 'connection', (socket) => {
    console.log( 'a user has connected' );

    socket.on( 'join', (data) => {
        sMessages.push( { user: data.user, message: `${data.user} has joined the chat room.`} );
        sUsers.push( data.user );

        io.emit( 'message', { 
            user: data.user, 
            message: `${data.user} has joined the chat room.`,
            sMessages: sMessages
        } );

        io.emit( 'new user', { 
            user: data.user,
            sUsers: sUsers
        } );
    });

    socket.on( 'message', (data) => {
        // console.log( 'data: ', data );
        if ( !data.joined ) {
            sMessages.push( { user: data.user, message: data.message } );

            io.emit( 'message', {
                user: data.user,
                message: data.message,
                sMessages: sMessages,
                sUsers: sUsers
            } );
        }
    });

    socket.on( 'disconnect', () => {
        console.log( 'user disconnected' );
    })
});