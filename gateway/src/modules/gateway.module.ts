import { Sensor } from '../models';

import {sendUART, initUART, onUART} from "../utils/serial.util";

export const init = async () => {
  await initUART();
}

export const on = (event: string, callback: Function) => {
  onUART(event, callback);
}

export const send = (sensors: any) => {
  sendUART(JSON.stringify(sensors));
}

export default {
  init,
  on,
  send
}