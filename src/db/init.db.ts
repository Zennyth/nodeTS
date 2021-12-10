import {Sensor} from './models/';
const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
  Sensor.sync({ force: isDev });
}
export default dbInit;