const io = require('socket.io-client');
const socket = io.connect(process.env.SERVER_URL, {
  reconnect: true, 
  query: {
    token: process.env.WEBSOCKET_R
  }
});

socket.on('connect', function (socket) {
  console.log('[SOCKET] Connected!');
});

export const onEvent = (event, callback) => {
  socket.on(event, callback);
}