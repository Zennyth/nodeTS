import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
import Delimiter from "@serialport/parser-delimiter";

const delimiter = process.env.SERIAL_DELIMITER;

let uart, pipe;

export const initUART = async () => {

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
}

export const onUART = (event: string, callback: Function) => {
  if(event == "") event = "data";
  pipe.on(event, callback);
}
