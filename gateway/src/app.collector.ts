import 'dotenv/config';
import { Sensor, Ack } from './models';
import { ACKs } from './models/ack.model';

import api from "./modules/api.module";
import gateway from "./modules/gateway.module";


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
    timeout();
  }, 10*1000);
}


const start = async () => {
  try {
    await api.init();
    await gateway.init();
    timeout();
  } catch (error) {
    console.log("Can't start the service: ", error);
  }

  gateway.on("data", (data: ArrayBuffer) => {
    try {
      timeout();
      const sensors: Sensor[] = JSON.parse(data.toString());
      api.send(sensors);
    } catch (error) {
      
    }
  });
}

start();



