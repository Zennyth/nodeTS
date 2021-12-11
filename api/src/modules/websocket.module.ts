import { Server } from "socket.io";

let io: Server;

const initWS = (httpServer) => {
  io = require('socket.io')(httpServer, {
  });

  io.on("connection", (socket) => {
    console.log(socket.id + " is connected !");
  });
}

const emitEvent = (event, data) => {
  console.log("Dispatch event: ", event);
  io.emit(event, data);
}

export {
  initWS,
  emitEvent
}