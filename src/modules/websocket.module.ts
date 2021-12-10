import { Server } from "socket.io";

let io: Server;

const initWS = (httpServer) => {
  io = new Server(httpServer, { /* options */ });
}

const emitEvent = (event, data) => {
  io.emit(event, data);
}

export {
  initWS,
  emitEvent
}