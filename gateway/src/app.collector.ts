import 'dotenv/config';
import { Sensor, Ack } from './models';
import { ACKs } from './models/ack.model';

import api from "./modules/api.module";
import gateway from "./modules/gateway.module";

let dataSent = {n: 0, data: null};
let dataToSend = [];


const start = async () => {

  try {
    await api.init();
    await gateway.init();
  } catch (error) {
    console.log("Can't start the service: ", error);
  }

  gateway.on("data", (data: ArrayBuffer) => {
    try {
      const sensors: Sensor[] = JSON.parse(data.toString());
      api.send(sensors);
    } catch (error) {
      
    }
  });
}

start();



