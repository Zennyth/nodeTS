import { Server } from "socket.io";
import {hasAccess, Roles} from "../roles";

let io: Server;

const initWS = (httpServer) => {
  io = require('socket.io')(httpServer, {});

  io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){
      if(hasAccess(socket.handshake.query.token.toString(), Roles.WEBSOCKET_R)) {
        next();
      } else {
        next(new Error('Authentication failed: Wrong token'));
      }

    }
    else {
      next(new Error('Authentication error'));
    }    
  })
  .on('connection', function(socket) {
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