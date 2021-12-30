import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
import Delimiter from "@serialport/parser-delimiter";
import { ACKs } from "../models/ack.model";

const delimiter = process.env.SERIAL_DELIMITER;
const isMock = process.env.ENVIRONMENT == "test";

let uart, pipe;

export const initUART = async () => {


  if (isMock) {
    const MockBinding = require('@serialport/binding-mock')
    SerialPort.Binding = MockBinding

    // Create a port and enable the echo and recording.
    MockBinding.createPort(process.env.SERIAL_PORT);
  }


  const start = new Promise((resolve, reject) => {
    const uart = new SerialPort(process.env.SERIAL_PORT, { baudRate: Number(process.env.SERIAL_BAUDRATE) }, function (err) {
      if (err) {
        // console.log('[SERIAL] Error: ', err.message);
        reject(err);
      } else {
        // console.log('[SERIAL] Connected!');
        resolve(uart);
      }
    });
  });

  uart = await start;

  pipe = uart.pipe(new Delimiter({ delimiter }));
}

export const portsAvailable = async () => {
  return await SerialPort.list();
}

export const sendUART = (data: string) => {
  uart.write(`${data}${delimiter}`);
  // console.log(`[SERIAL] Sent: ${data}${delimiter}`)

  if (isMock) {
    setTimeout(() => {
      uart.binding.emitData(`${JSON.stringify({ack: ACKs.VALID})}${delimiter}`);
    }, 500);
  }
}

export const onUART = (event: string, callback: Function) => {
  if(event == "") event = "data";
  pipe.on(event, callback);
}
