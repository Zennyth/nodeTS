import 'dotenv/config';
import { Sensor, Ack } from './models';
import { ACKs } from './models/ack.model';

import api from "./modules/api.module";
import gateway from "./modules/gateway.module";

import {explodeChunks} from "./utils/chunk.util";

import {initLog, logError, logSuccess} from "./utils/log.util";
initLog("SENDER");

let dataSent = {n: 0, data: null, timeout: null};
let dataToSend = [];

import {portsAvailable} from "./utils/serial.util";

const start = async () => {

  // console.log((await portsAvailable()))

  try {
    await api.init();
    await gateway.init();
    logSuccess(`Service started !`);
  } catch (error) {
    logError(`Can't start the service: ${error}`);
    return;
  }

  const cTimeout = () => {
    if(dataSent.timeout) clearTimeout(dataSent.timeout);
  }

  const timeout = () => {
    cTimeout();
    dataSent.timeout = setTimeout(() => {
      console.log("[TIMEOUT]");
      gateway.send(dataSent.data);
      dataSent.n += 1;
      timeout();
    }, 2000);
  }

  api.on("onUpdateSensors", (sensors: Sensor[]) => {

    // reduce size of packets and explode sensors into chunks
    const chunks = explodeChunks(
      sensors.map(sensor => {
        return {
          id: sensor.id,
          intensity: sensor.intensity,
          radius: sensor.radius
        }
      })
    );
    
    if(dataSent.data == null) {
      dataSent.data = chunks.shift();
      gateway.send(dataSent.data);
      dataSent.n = 1;
      timeout();
    }

    chunks.forEach(chunk => {
      dataToSend.push(chunk);
    });
  });

  gateway.on("data", (data: ArrayBuffer) => {
    try {
      const ack: Ack = JSON.parse(data.toString().replace("'", '"')); 
      console.log("[GATEWAY] ack:", ACKs[ack.ack]);

      if(ack.ack == ACKs.VALID) {
        cTimeout();
        if(dataToSend.length > 0) {
          dataSent.data = dataToSend.shift();
          dataSent.n = 1;
          gateway.send(dataSent.data);
          timeout();
        } else {
          dataSent.data = null;
        }
      } else {
        if(dataSent.n >= 10) {
          if(dataToSend.length > 0) {
            dataSent.data = dataToSend.shift();
            gateway.send(dataSent.data);
            dataSent.n = 1;
            timeout();
          } else {
            dataSent.data = null;
            dataSent.n = 0;
          }
          console.log("[GATEWAY] ack: LIMIT REACHED", 10)
        }

        if(dataSent.data !== null) {
          gateway.send(dataSent.data);
          dataSent.n += 1;
          timeout();
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
}

start();



