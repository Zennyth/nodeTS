import 'dotenv/config';
import { Sensor, Ack } from './models';
import { ACKs } from './models/ack.model';

import api from "./modules/api.module";
import gateway from "./modules/gateway.module";
import {portsAvailable} from "./utils/serial.util"

var listSens = []

const reset = {
  timeout: null
}

const cTimeout = () => {
  if(reset.timeout) clearTimeout(reset.timeout);
}
const timeout = () => {
  cTimeout();
  reset.timeout = setTimeout(() => {
    console.log("[RESET]");
    gateway.send({"cmd": "reset"});
    timeout();
  }, 30*1000);
}


const start = async () => {
  try {
    await api.init();
    await gateway.init();
    //timeout();
  } catch (error) {
    console.log("Can't start the service: ", error);
  }

  gateway.on("data", (data: ArrayBuffer) => {
    try {
      //timeout();
      const sensors: Sensor[] = JSON.parse(data.toString());
      listSens = [...listSens, ...sensors];
      console.log(sensors)
      console.log(listSens.length)
      api.send(sensors);
    } catch (error) {
      console.log(data.toString(), error);
    }
  });
}

start();



