import { isDeepStrictEqual } from 'util';
import { createOrUpdateRange } from '../services/sensor.service';
import { CreateSensorDTO } from './dto/sensor.dto';
import {Sensor, Emergency, Station, Team} from './models/';
const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

const min_latitude: number =  45.723967; const step_latitude: number = 0.06 / 6.0; const range_latitude: number = 6;
const min_longitude: number = 4.797831; const step_longitude: number = 0.011; const range_longitude: number = 10;

const dbInit = async () => {
  await Emergency.sync({ force: isDev });
  await Sensor.sync({ force: isDev });
  await Station.sync({ force: isDev });
  await Team.sync({ force: isDev });

  try {
    let sensors: CreateSensorDTO[] = [];
    let id = 0
    for(let latitude = 0; latitude < range_latitude; latitude++) {
      for(let longitude = 0; longitude < range_longitude; longitude++) {
        let sensor : CreateSensorDTO = {
          "id" : String(id),
          "latitude" : min_latitude + latitude * step_latitude,
          "longitude" : min_longitude + longitude * step_longitude,
          "radius" : 0.01929018172830706 / 2,
          "intensity" : 0
        }
        id++;
        sensors.push(sensor);
      }
    }
    let result: CreateSensorDTO[] = await createOrUpdateRange(sensors);



  } catch(error) {
    console.log(error);
  }
}

export default dbInit;