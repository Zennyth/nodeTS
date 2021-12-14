import { isDeepStrictEqual } from 'util';
import {Sensor, Emergency, Station, Team} from './models/';
const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

console.log(isDev)

const dbInit = () => {
  Emergency.sync({ force: isDev });
  Sensor.sync({ force: isDev });
  Station.sync({ force: isDev });
  Team.sync({ force: isDev });
}

export default dbInit;