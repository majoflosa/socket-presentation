const app = require( 'express' )();
const server = require( 'http' ).Server( app );
const io = require( 'socket.io' )(server);
const port = 4000;

server.listen( port, () => console.log( `Server is running on port ${port}`) );

io.on( 'connection', (socket) => {
    console.log( 'a user has connected' );

    socket.on( 'join', (data) => {
        io.emit( 'message', { user: data.user, message: `${data.user} has joined the chat room.`} );
    });

    socket.on( 'message', (data) => {
        // console.log( 'data: ', data );
        if ( !data.joined ) {
            io.emit( 'message', data );
        }
    });

    socket.on( 'disconnect', () => {
        console.log( 'user disconnected' );
    })
});