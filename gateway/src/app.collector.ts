import 'dotenv/config';
import { Sensor, Ack } from './models';
import { ACKs } from './models/ack.model';

import api from "./modules/api.module";
import gateway from "./modules/gateway.module";
import {client, subscribe, publish} from "./utils/mqtt.utils";

var listSens = []

const reset = {
  timeout: null
}

const topic = '/sensors/all'

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

  client.on("connect", () => {
    console.log(`Connected to broker!`);
    subscribe(topic);
  })

  client.on('error', (error) => {
    console.log(`Cannot connect to broker: `, error)
  })

  client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
  })

  gateway.on("data", async (data: ArrayBuffer) => {
    try {
      //timeout();
      const sensors: Sensor[] = JSON.parse(data.toString());
      listSens = [...listSens, ...sensors];
      console.log(sensors)
      publish(topic, sensors)
      console.log(listSens.length)
      const response = await api.send(sensors);
      // console.log(response);
    } catch (error) {
      console.log(data.toString(), error);
    }
  });
}

start();



