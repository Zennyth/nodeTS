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

  io.on("connection", (socket) => {
    console.log(socket.id + " is connected !");

    socket.on('disconnect', () => {
      console.log(socket.id + ' got disconnected !');
    });
  });
}

const emitEvent = async (event, data) => {
  io.emit(event, data);
  console.log("Dispatch event: ", event);
  const users = await io.allSockets();
  console.log("for : ", users);
}

export {
  initWS,
  emitEvent
}