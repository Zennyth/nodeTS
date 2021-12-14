import 'dotenv/config';

import {onEvent} from "./modules/websocket.module";
import {send, portsAvailable, init} from "./modules/serial.module";
import { Sensor } from './models';

init();

const handleSensors = (sensors: Sensor[]) => {
  send(JSON.stringify(sensors));

  // sensors.forEach(sensor => {
  //   send(JSON.stringify(sensor));
  // });
}

onEvent("onSensorsUpdate", handleSensors);




const entry = async () => {
  console.log(await portsAvailable());
}
entry();