import {Sensor, Emergency} from './models/';
const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
  Emergency.sync({ force: isDev });
  Sensor.sync({ force: isDev });
}

export default dbInit;