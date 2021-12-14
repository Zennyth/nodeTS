import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";

const delimiter = process.env.SERIAL_DELIMITER;

let uart, pipe;

export const init = () => {
  uart = new SerialPort(process.env.SERIAL_PORT, { baudRate: Number(process.env.SERIAL_BAUDRATE) }, function (err) {
    if (err) {
      console.log('[SERIAL] Error: ', err.message);
    } else {
      console.log('[SERIAL] Connected!');
    }
  });

  pipe = uart.pipe(new Readline({ delimiter }));
}

export const portsAvailable = async () => {
  return await SerialPort.list();
}

export const send = (data: string) => {
  uart.write(`${data}${delimiter}`);
}

export const on = (event: string, callback: Function) => {
  if(event == "") event = "data";
  pipe.on(event, callback);
}
