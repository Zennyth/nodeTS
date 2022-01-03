import 'dotenv/config';
import { Sensor, Ack } from './models';
import { ACKs } from './models/ack.model';

import api from "./modules/api.module";
import gateway from "./modules/gateway.module";

import {explodeChunks} from "./utils/chunk.util";

import {initLog, logError, logSuccess} from "./utils/log.util";
initLog("SENDER");
const LIMIT = Number(process.env.SENDER_LIMIT);

let dataSent = {n: 0, data: null, timeout: null};
let dataToSend = [];

import {portsAvailable} from "./utils/serial.util";

const start = async () => {

  //console.log((await portsAvailable()))

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

  const sendThroughGateway = (reset: boolean = true) => {
    gateway.send(dataSent.data);
    if(reset) dataSent.n = 1;
    else dataSent.n++;
    timeout();
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
    
    // is dataSent is empty
    if(dataSent.data == null) {
      // fill up send current sensors
      dataSent.data = chunks.shift();
      sendThroughGateway();
    }

    chunks.forEach(chunk => {
      dataToSend.push(chunk);
    });
  });

  gateway.on("data", (data: ArrayBuffer) => {
    try {
      const ack: Ack = JSON.parse(data.toString().split("'").join('"')); 
      console.log(`[GATEWAY] ack: ${ACKs[ack.ack]} for n: ${dataSent.n}`);


      if(ack.ack == ACKs.VALID) {
        cTimeout();
        if(dataToSend.length > 0) {
          dataSent.data = dataToSend.shift();
          sendThroughGateway();
        } else {
          dataSent.data = null;
        }
      } else {
        if(dataSent.n >= LIMIT) {
          console.log("[GATEWAY] ack: LIMIT REACHED", LIMIT);
          if(dataToSend.length > 0) {
            dataSent.data = dataToSend.shift();
            dataSent.n = 0;
          } else {
            dataSent.data = null;
            dataSent.n = 0;
            cTimeout();
          }
        }

        if(dataSent.data !== null) {
          sendThroughGateway(false);
        }
      }
    } catch (error) {
      console.log(data.toString().split("'").join('"'));
    }
  });
}

start();



